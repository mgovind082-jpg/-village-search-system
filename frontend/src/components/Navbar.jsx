function Navbar() {
  return (
    <div style={{
      background: "#FFFDF9",
      borderBottom: "1px solid #D8D0C4",
      padding: "15px 20px"
    }}>
      <div style={{
        maxWidth: "1100px",
        margin: "auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            background: "#E8500A",
            color: "white",
            padding: "6px 10px",
            borderRadius: "6px",
            fontWeight: "700"
          }}>
            IN
          </div>
          <div>
            <div style={{ fontWeight: "600" }}>VillagesAPI</div>
            <div style={{ fontSize: "12px", color: "#9A9088" }}>
              India Geo Data Platform
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span>Docs</span>
          <span>Pricing</span>
          <span>Dashboard</span>

          <button style={{
            background: "#E8500A",
            color: "white",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer"
          }}>
            Get API Key →
          </button>
        </div>

      </div>
    </div>
  );
}

export default Navbar;