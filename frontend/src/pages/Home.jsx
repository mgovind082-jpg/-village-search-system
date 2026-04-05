import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function Home() {
  const fadeStyle = {
    animation: "fadeInUp 0.6s ease forwards"
  };

  const hoverCard = {
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delay = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/villages?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data.slice(0, 6));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#F5F2ED", minHeight: "100vh" }}>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <Navbar />

      <div style={{
        maxWidth: "1000px",
        margin: "auto",
        padding: window.innerWidth < 768 ? "30px 16px" : "40px 20px",
        ...fadeStyle
      }}>
        <h1 style={{
          fontSize: window.innerWidth < 768 ? "32px" : "52px",
          fontWeight: "700",
          lineHeight: "1.2",
          marginBottom: "10px",
          color: "#1A1410"
        }}>
          Search any <span style={{ color: "#E8500A" }}>village</span> in India instantly
        </h1>

        <p style={{
          color: "#5A5248",
          marginBottom: "25px",
          fontSize: "16px"
        }}>
          Access structured village data with complete administrative hierarchy in real-time
        </p>

        {/* Stats Row */}
        <div style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: window.innerWidth < 768 ? "center" : "flex-start",
          textAlign: window.innerWidth < 768 ? "center" : "left",
          marginBottom: "30px",
          color: "#9A9088",
          fontSize: "14px"
        }}>
          <span>600K+ Villages</span>
          <span>700+ Districts</span>
          <span>36 States</span>
          <span>&lt;50ms Response</span>
        </div>

        <div style={{
          position: "relative",
          marginTop: "30px",
          maxWidth: window.innerWidth < 768 ? "100%" : "500px",
          width: "100%",
          margin: "30px auto 0 auto"
        }}>
          <div style={{ position: "relative" }}>
            {/* Icon */}
            <span style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9A9088",
              fontSize: "18px"
            }}>
              🔍
            </span>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search village, district, or state..."
              style={{
                width: "100%",
                padding: "14px 42px 14px 42px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                border: "1px solid #D8D0C4",
                fontSize: "16px",
                outline: "none",
                transition: "all 0.25s ease"
              }}
              onFocus={(e) => {
                e.target.style.border = "1px solid #E8500A";
                e.target.style.boxShadow = "0 0 0 3px rgba(232,80,10,0.15)";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid #D8D0C4";
                e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
              }}
            />
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ marginTop: "8px", fontSize: "14px", color: "#9A9088" }}>
              Searching...
            </div>
          )}

          {/* Dropdown */}
          {results.length > 0 && (
            <div style={{
              position: "absolute",
              top: "58px",
              left: 0,
              right: 0,
              width: "100%",
              background: "white",
              border: "1px solid #D8D0C4",
              borderRadius: "10px",
              overflow: "hidden",
              zIndex: 10,
              animation: "fadeInUp 0.3s ease",
            }}>
              {results.map((r, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelected(r);
                    setQuery(r.village);
                    setResults([]);
                  }}
                  style={{
                    padding: "12px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee"
                  }}
                >
                  <strong>{r.village}</strong>
                  <div style={{ fontSize: "12px", color: "#9A9088" }}>
                    {r.sub_district} › {r.district} › {r.state}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Empty state */}
        {!loading && query && results.length === 0 && (
          <div style={{
            marginTop: "10px",
            color: "#9A9088",
            textAlign: "center",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto"
          }}>
            No results found
          </div>
        )}

        {selected && (
          <div style={{
            marginTop: "30px",
            maxWidth: "700px",
            marginLeft: "auto",
            marginRight: "auto",
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #D8D0C4",
            display: window.innerWidth < 768 ? "block" : "grid"
          }}>
            <h3 style={{ marginBottom: "10px" }}>📍 Location Details</h3>

            <p><b>Village:</b> {selected.village}</p>
            <p><b>Sub-District:</b> {selected.sub_district}</p>
            <p><b>District:</b> {selected.district}</p>
            <p><b>State:</b> {selected.state}</p>
          </div>
        )}
        {/* FEATURES SECTION */}
        <div style={{ marginTop: "60px" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>
            Why use VillagesAPI?
          </h2>

          <div style={{
            display: "flex",
            flexDirection: window.innerWidth < 768 ? "column" : "row",
            gap: "20px",
          }}>

            {/* Card 1 */}
            <div
              style={{
                flex: "1",
                minWidth: "250px",
                background: "white",
                ...hoverCard
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>⚡ Sub-50ms responses</h3>
              <p style={{ fontSize: "14px", color: "#5A5248" }}>
                Powered by optimized queries and caching for lightning-fast API performance.
              </p>
            </div>

            {/* Card 2 */}
            <div
              style={{
                flex: "1",
                minWidth: "250px",
                background: "white",
                ...hoverCard
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>🧭 Complete hierarchy</h3>
              <p style={{ fontSize: "14px", color: "#5A5248" }}>
                Get full Village → Sub-District → District → State chain in every response.
              </p>
            </div>

            {/* Card 3 */}
            <div
              style={{
                flex: "1",
                minWidth: "250px",
                background: "white",
                ...hoverCard
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>🔐 API key & limits</h3>
              <p style={{ fontSize: "14px", color: "#5A5248" }}>
                Secure access with API keys, rate limiting, and usage tracking.
              </p>
            </div>

          </div>
        </div>
        {/* PRICING SECTION */}
        <div style={{ marginTop: "70px" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>
            Simple, transparent pricing
          </h2>

          <div style={{
            display: "flex",
            flexDirection: window.innerWidth < 768 ? "column" : "row",
            gap: "20px",
          }}>

            {/* Free Plan */}
            <div
              style={{
                flex: "1",
                minWidth: "250px",
                background: "white",
                ...hoverCard
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h3>Free</h3>
              <h2 style={{ margin: "10px 0" }}>₹0 / mo</h2>
              <p style={{ fontSize: "14px", color: "#5A5248" }}>
                1,000 requests/day<br/>
                1 API key<br/>
                Limited states access
              </p>
            </div>

            {/* Premium Plan (Highlighted) */}
            <div
              style={{
                flex: "1",
                minWidth: "250px",
                background: "#FFF3EC",
                padding: "20px",
                borderRadius: "12px",
                border: "2px solid #E8500A",
                ...hoverCard
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h3 style={{ color: "#E8500A" }}>Premium</h3>
              <h2 style={{ margin: "10px 0" }}>₹999 / mo</h2>
              <p style={{ fontSize: "14px", color: "#5A5248" }}>
                50,000 requests/day<br/>
                5 API keys<br/>
                All states access
              </p>
            </div>

            {/* Pro Plan */}
            <div
              style={{
                flex: "1",
                minWidth: "250px",
                background: "white",
                ...hoverCard
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h3>Pro</h3>
              <h2 style={{ margin: "10px 0" }}>₹2,999 / mo</h2>
              <p style={{ fontSize: "14px", color: "#5A5248" }}>
                Unlimited requests<br/>
                Unlimited API keys<br/>
                Analytics dashboard
              </p>
            </div>

          </div>
        </div>
      </div>
      {/* FOOTER */}
      <div style={{
        marginTop: "80px",
        background: "#1A1410",
        color: "#FFFDF9",
        padding: window.innerWidth < 768 ? "20px 10px" : "24px",
        textAlign: "center",
        fontSize: "14px"
      }}>
        Built with ♥ for India • VillagesAPI • Powered by NeonDB + Redis + Vercel
      </div>
    </div>
  );
}

export default Home;