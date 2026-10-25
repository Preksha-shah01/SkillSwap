import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("skillswap_token");
    navigate("/login", { replace: true });
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Welcome to SkillSwap!</h1>

      <p>
        You have successfully logged in.
      </p>

      <p>
        This is the temporary Student Dashboard.
      </p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </main>
  );
}