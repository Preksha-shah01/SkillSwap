
import { useLocation, Link } from "react-router-dom";
import "./layout.css";

function SkillSwapLayout({ children }) {
  const location = useLocation();

  const isSkillExchange =
    location.pathname === "/skill-exchange";

  const isKnowledgeHub =
    location.pathname === "/" ||
    location.pathname === "/upload" ||
    location.pathname.startsWith("/note/");

  const isOverview =
    location.pathname === "/overview";

  const isProfile =
    location.pathname === "/profile";

  const isWallet =
    location.pathname === "/wallet";

  const isCommunity =
    location.pathname === "/community";

  const isLeaderboard =
    location.pathname === "/leaderboard";

  const isMessages =
    location.pathname === "/messages";

  const isRatings =
    location.pathname === "/ratings";

  return (
    <div className="skillswap-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">

        {/* BRAND */}
        <div className="brand">
          <div className="brand-icon">↗</div>
          <span>SkillSwap</span>
        </div>

        {/* CAMPUS */}
        <div className="campus-card">
          <div className="campus-icon">N</div>

          <div>
            <small>Your campus</small>
            <strong>Northstar University</strong>
          </div>
        </div>

        {/* WORKSPACE */}
        <div className="sidebar-section">
          <p>WORKSPACE</p>

          {/* OVERVIEW */}
          <Link
            to="/overview"
            className={`sidebar-item ${
              isOverview ? "active" : ""
            }`}
          >
            <span>⌂</span>
            <span>Overview</span>
          </Link>

          {/* PROFILE & SKILLS */}
          <Link
            to="/profile"
            className={`sidebar-item ${
              isProfile ? "active" : ""
            }`}
          >
            <span>◯</span>
            <span>Profile & Skills</span>
          </Link>

          {/* SKILL EXCHANGE */}
          <Link
            to="/skill-exchange"
            className={`sidebar-item ${
              isSkillExchange ? "active" : ""
            }`}
          >
            <span>⇄</span>
            <span>Skill Exchange</span>
            <b>2</b>
          </Link>

          {/* KNOWLEDGE HUB */}
          <Link
            to="/"
            className={`sidebar-item ${
              isKnowledgeHub ? "active" : ""
            }`}
          >
            <span>▤</span>
            <span>Knowledge Hub</span>
          </Link>

          {/* WALLET */}
          <Link
            to="/wallet"
            className={`sidebar-item ${
              isWallet ? "active" : ""
            }`}
          >
            <span>◇</span>
            <span>Wallet</span>
          </Link>

          {/* COMMUNITY */}
          <Link
            to="/community"
            className={`sidebar-item ${
              isCommunity ? "active" : ""
            }`}
          >
            <span>◎</span>
            <span>Community</span>
          </Link>

          {/* LEADERBOARD */}
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

          {/* MESSAGES */}
          <Link
            to="/messages"
            className={`sidebar-item ${
              isMessages ? "active" : ""
            }`}
          >
            <span>▱</span>
            <span>Messages</span>
            <b>3</b>
          </Link>

          {/* RATINGS & REVIEWS */}
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

          <div className="breadcrumb">
            Workspace /{" "}
            <strong>
              {isOverview && "Overview"}
              {isProfile && "Profile & Skills"}
              {isSkillExchange && "Skill Exchange"}
              {isKnowledgeHub && "Knowledge Hub"}
              {isWallet && "Wallet"}
              {isCommunity && "Community"}
              {isLeaderboard && "Leaderboard"}
              {isMessages && "Messages"}
              {isRatings && "Ratings & Reviews"}
            </strong>
          </div>

          <div className="topbar-right">

            <div className="top-search">
              <span>⌕</span>
              <span>Search skills, notes...</span>
            </div>

            <div className="top-icon">
              ▱
            </div>

            <div className="top-icon">
              ♧
            </div>

            <div className="profile-circle">
              AK
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