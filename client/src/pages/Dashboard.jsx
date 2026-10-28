
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const iframeRef = useRef(null);

  const [user, setUser] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [error, setError] = useState("");

  // Fetch the currently logged-in student
  useEffect(() => {
    const token = sessionStorage.getItem("skillswap_token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const controller = new AbortController();

    async function loadUser() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }
        );

        if (response.status === 401) {
          sessionStorage.removeItem("skillswap_token");
          navigate("/login", { replace: true });
          return;
        }

        if (!response.ok) {
          throw new Error("Unable to load user details");
        }

        const data = await response.json();

        if (!data.user) {
          throw new Error("User details not found");
        }

        setUser(data.user);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Dashboard error:", err);
          setError(err.message);
        }
      }
    }

    loadUser();

    return () => controller.abort();
  }, [navigate]);

  // Send data only after BOTH the user and iframe are ready
  useEffect(() => {
    if (!user || !iframeLoaded) return;

    iframeRef.current?.contentWindow?.postMessage(
      {
        type: "SKILLSWAP_USER",
        user,
      },
      window.location.origin
    );
  }, [user, iframeLoaded]);

  function handleLogout() {
    sessionStorage.removeItem("skillswap_token");
    localStorage.removeItem("skillswapUser");
    navigate("/login", { replace: true });
  }

  useEffect(() => {
  function handleDashboardNavigation(event) {
    if (event.origin !== window.location.origin) return;

    if (
  event.source === iframeRef.current?.contentWindow &&
  event.data?.type === "SKILLSWAP_NAVIGATE" &&
  ["/profile-skills", "/skill-exchange"].includes(event.data.path)
) {
  navigate(event.data.path);
}
  }

  window.addEventListener("message", handleDashboardNavigation);

  return () => {
    window.removeEventListener("message", handleDashboardNavigation);
  };
}, [navigate]);

  return (
    <div
  style={{
    width: "100%",
    minHeight: "100dvh",
    margin: 0,
    padding: 0,
    overflow: "hidden",
  }}
>
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

      {error && (
        <p role="alert" style={{ color: "red", padding: "10px" }}>
          {error}
        </p>
      )}

      <iframe
        ref={iframeRef}
        title="SkillSwap Student Dashboard"
        src="/dashboard.html"
        onLoad={() => setIframeLoaded(true)}
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
