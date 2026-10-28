
import { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./layout.css";

const API_URL = "http://localhost:5000";

function SkillSwapLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // ----------------------------------
  // LOAD LOGGED-IN STUDENT
  // ----------------------------------

  useEffect(() => {
    const controller = new AbortController();
    const token = sessionStorage.getItem(
      "skillswap_token"
    );

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    async function fetchCurrentUser() {
      try {
        const response = await fetch(
          `${API_URL}/api/auth/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }
        );

        if (response.status === 401) {
          sessionStorage.removeItem(
            "skillswap_token"
          );
          navigate("/login", { replace: true });
          return;
        }

        if (!response.ok) {
          throw new Error(
            "Unable to load student profile"
          );
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setUser(data.user || null);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "Failed to fetch student:",
            error
          );
        }
      }
    }

    fetchCurrentUser();

    return () => controller.abort();
  }, [navigate]);

  // ----------------------------------
  // CLOSE PROFILE MENU
  // ----------------------------------

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // Close dropdown when navigating.
  useEffect(() => {
    setProfileOpen(false);
  }, [location.pathname]);

  // ----------------------------------
  // DYNAMIC STUDENT DETAILS
  // ----------------------------------

  const userName = user?.name || "Student";

  const initials = userName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) =>
      part.charAt(0).toUpperCase()
    )
    .join("");

  const university =
    user?.university || "Campus not specified";

  const campusInitial =
    university.charAt(0).toUpperCase();

  // ----------------------------------
  // ACTIVE SIDEBAR ROUTES
  // ----------------------------------

  const pathname = location.pathname;

  const isOverview =
    pathname === "/dashboard";

  const isProfile =
    pathname === "/profile-skills";

  const isSkillExchange =
    pathname === "/skill-exchange" ||
    pathname === "/swap-workspace";

  const isKnowledgeHub =
    pathname === "/knowledge-hub" ||
    pathname === "/upload" ||
    pathname.startsWith("/note/");

  const isWallet = pathname === "/wallet";
  const isCommunity = pathname === "/community";
  const isLeaderboard = pathname === "/leaderboard";
  const isMessages = pathname === "/messages";
  const isRatings = pathname === "/ratings";

  // ----------------------------------
  // PAGE TITLE
  // ----------------------------------

  let pageTitle = "Workspace";

  if (isOverview) pageTitle = "Overview";
  else if (isProfile) pageTitle = "Profile & Skills";
  else if (pathname === "/swap-workspace")
    pageTitle = "Swap Workspace";
  else if (isSkillExchange)
    pageTitle = "Skill Exchange";
  else if (isKnowledgeHub)
    pageTitle = "Knowledge Hub";
  else if (isWallet) pageTitle = "Wallet";
  else if (isCommunity) pageTitle = "Community";
  else if (isLeaderboard) pageTitle = "Leaderboard";
  else if (isMessages) pageTitle = "Messages";
  else if (isRatings)
    pageTitle = "Ratings & Reviews";

  // ----------------------------------
  // LOGOUT
  // ----------------------------------

  function handleLogout() {
    sessionStorage.removeItem(
      "skillswap_token"
    );

    setUser(null);
    setProfileOpen(false);

    navigate("/login", { replace: true });
  }

  // ----------------------------------
  // PROFILE NAVIGATION
  // ----------------------------------

  function goToPage(path) {
    setProfileOpen(false);
    navigate(path);
  }

  // ----------------------------------
  // RENDER
  // ----------------------------------

  return (
    <div className="skillswap-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">

        {/* BRAND */}
        <div className="brand">
          <div className="brand-icon">
            ↗
          </div>
          <span>SkillSwap</span>
        </div>

        {/* CAMPUS */}
        <div className="campus-card">
          <div className="campus-icon">
            {campusInitial}
          </div>

          <div>
            <small>Your campus</small>
            <strong>{university}</strong>
          </div>
        </div>

        {/* WORKSPACE */}
        <div className="sidebar-section">
          <p>WORKSPACE</p>

          <Link
            to="/dashboard"
            className={`sidebar-item ${
              isOverview ? "active" : ""
            }`}
          >
            <span>⌂</span>
            <span>Overview</span>
          </Link>

          <Link
            to="/profile-skills"
            className={`sidebar-item ${
              isProfile ? "active" : ""
            }`}
          >
            <span>◯</span>
            <span>Profile & Skills</span>
          </Link>

          <Link
            to="/skill-exchange"
            className={`sidebar-item ${
              isSkillExchange ? "active" : ""
            }`}
          >
            <span>⇄</span>
            <span>Skill Exchange</span>
          </Link>

          <Link
            to="/knowledge-hub"
            className={`sidebar-item ${
              isKnowledgeHub ? "active" : ""
            }`}
          >
            <span>▤</span>
            <span>Knowledge Hub</span>
          </Link>

          <Link
            to="/wallet"
            className={`sidebar-item ${
              isWallet ? "active" : ""
            }`}
          >
            <span>◇</span>
            <span>Wallet</span>
          </Link>

          <Link
            to="/community"
            className={`sidebar-item ${
              isCommunity ? "active" : ""
            }`}
          >
            <span>◎</span>
            <span>Community</span>
          </Link>

          <Link
            to="/leaderboard"
            className={`sidebar-item ${
              isLeaderboard ? "active" : ""
            }`}
          >
            <span>♜</span>
            <span>Leaderboard</span>
          </Link>
        </div>

        {/* YOUR SPACE */}
        <div className="sidebar-section">
          <p>YOUR SPACE</p>

          <Link
            to="/messages"
            className={`sidebar-item ${
              isMessages ? "active" : ""
            }`}
          >
            <span>▱</span>
            <span>Messages</span>
          </Link>

          <Link
            to="/ratings"
            className={`sidebar-item ${
              isRatings ? "active" : ""
            }`}
          >
            <span>☆</span>
            <span>Ratings & Reviews</span>
          </Link>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="main-area">

        {/* TOP BAR */}
        <header className="topbar">

          {/* BREADCRUMB */}
          <div className="breadcrumb">
            Workspace /{" "}
            <strong>{pageTitle}</strong>
          </div>

          {/* RIGHT SECTION */}
          <div className="topbar-right">

            {/* SEARCH DISPLAY */}
            <div className="top-search">
              <span>⌕</span>
              <span>
                Search skills, notes...
              </span>
            </div>

            {/* EXISTING ICONS */}
            <div className="top-icon">
              ▱
            </div>

            <div className="top-icon">
              ♧
            </div>

            {/* DYNAMIC PROFILE */}
            <div
              className="profile-wrapper"
              ref={profileRef}
            >
              <div className="profile-wrapper" ref={profileRef}>

  <button
    type="button"
    className="profile-circle profile-button"
    onClick={() => setProfileOpen((prev) => !prev)}
    aria-label="Open profile menu"
    aria-expanded={profileOpen}
    aria-haspopup="menu"
  >
    {initials}
  </button>

  {profileOpen && (
    <div className="profile-dropdown" role="menu">

      <div className="profile-dropdown-header">
        <div className="dropdown-avatar">
          {initials}
        </div>

        <div>
          <strong>{userName}</strong>
          <small>{university}</small>
        </div>
      </div>

      <div className="profile-dropdown-divider" />

      <button
        type="button"
        role="menuitem"
        onClick={() => {
          setProfileOpen(false);
          navigate("/profile-skills");
        }}
      >
        My Profile & Skills
      </button>

      <button
        type="button"
        role="menuitem"
        onClick={() => {
          setProfileOpen(false);
          navigate("/dashboard");
        }}
      >
        Dashboard
      </button>

      <div className="profile-dropdown-divider" />

      <button
        type="button"
        role="menuitem"
        className="logout-option"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  )}

</div>

              {/* PROFILE DROPDOWN */}
              {profileOpen && (
                <div className="profile-dropdown">

                  {/* USER INFO */}
                  <div className="profile-dropdown-header">

                    <div className="dropdown-avatar">
                      {initials}
                    </div>

                    <div>
                      <strong>{userName}</strong>
                      <small>{university}</small>
                    </div>
                  </div>

                  <div className="profile-dropdown-divider" />

                  {/* MY PROFILE */}
                  <button
                    type="button"
                    onClick={() =>
                      goToPage("/profile-skills")
                    }
                  >
                    ◯ My Profile & Skills
                  </button>

                  {/* DASHBOARD */}
                  <button
                    type="button"
                    onClick={() =>
                      goToPage("/dashboard")
                    }
                  >
                    ⌂ Dashboard
                  </button>

                  <div className="profile-dropdown-divider" />

                  {/* LOGOUT */}
                  <button
                    type="button"
                    className="logout-option"
                    onClick={handleLogout}
                  >
                    ↪ Logout
                  </button>

                </div>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="page-content">
          {children}
        </div>

      </main>
    </div>
  );
}

export default SkillSwapLayout;
