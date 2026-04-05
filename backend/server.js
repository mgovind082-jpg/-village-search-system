const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());

const pool = new Pool({
  user: "govindmeena",
  host: "localhost",
  database: "village_db",
  password: "",
  port: 5432,
});

// API route
app.get("/villages", async (req, res) => {
  const search = req.query.q || "";

  try {
    const result = await pool.query(
      `SELECT * FROM villages 
       WHERE LOWER(village) LIKE '%' || LOWER($1) || '%'
       OR LOWER(district) LIKE '%' || LOWER($1) || '%'
       OR LOWER(state) LIKE '%' || LOWER($1) || '%'
       LIMIT 50`,
      [search]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000 🚀");
});