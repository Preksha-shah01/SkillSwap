
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("skillswap_token");
    localStorage.removeItem("skillswapUser");

    navigate("/login", { replace: true });
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div
        style={{
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 20px",
          background: "#171020",
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            background: "#8246e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <iframe
        title="SkillSwap Student Dashboard"
        src="/dashboard.html"
        style={{
          width: "100%",
          height: "calc(100vh - 48px)",
          border: "none",
          display: "block",
        }}
      />
    </div>
  );
}
