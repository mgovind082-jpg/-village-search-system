import pandas as pd
import psycopg2

# Load CSV
df = pd.read_csv("cleaned_village_data.csv")

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname="village_db",
    user="govindmeena",
    password="",   # keep empty for Mac default
    host="localhost",
    port="5432"
)

cursor = conn.cursor()

# Create table
cursor.execute("""
CREATE TABLE IF NOT EXISTS villages (
    id SERIAL PRIMARY KEY,
    state TEXT,
    district TEXT,
    sub_district TEXT,
    village TEXT
)
""")

# Insert data
for _, row in df.iterrows():
    cursor.execute("""
        INSERT INTO villages (state, district, sub_district, village)
        VALUES (%s, %s, %s, %s)
    """, (
        row["STATE NAME"],
        row["DISTRICT NAME"],
        row["SUB-DISTRICT NAME"],
        row["Area Name"]
    ))

conn.commit()
cursor.close()
conn.close()

print("✅ Data inserted into database!")