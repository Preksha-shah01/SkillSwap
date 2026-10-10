import "./layout.css";

function SkillSwapLayout({ children }) {
  return (
    <div className="skillswap-layout">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">↗</div>
          <span>SkillSwap</span>
        </div>

        <div className="campus-card">
          <div className="campus-icon">N</div>

          <div>
            <small>Your campus</small>
            <strong>Northstar University</strong>
          </div>
        </div>

        <div className="sidebar-section">
          <p>WORKSPACE</p>

          <div className="sidebar-item">
            <span>⌂</span>
            <span>Overview</span>
          </div>

          <div className="sidebar-item">
            <span>◯</span>
            <span>Profile & Skills</span>
          </div>

          <div className="sidebar-item">
            <span>⇄</span>
            <span>Skill Exchange</span>
            <b>2</b>
          </div>

          <div className="sidebar-item active">
            <span>▤</span>
            <span>Knowledge Hub</span>
          </div>

          <div className="sidebar-item">
            <span>◇</span>
            <span>Wallet</span>
          </div>

          <div className="sidebar-item">
            <span>◎</span>
            <span>Community</span>
          </div>

          <div className="sidebar-item">
            <span>♜</span>
            <span>Leaderboard</span>
          </div>
        </div>

        <div className="sidebar-section">
          <p>YOUR SPACE</p>

          <div className="sidebar-item">
            <span>▱</span>
            <span>Messages</span>
            <b>3</b>
          </div>

          <div className="sidebar-item">
            <span>☆</span>
            <span>Ratings & Reviews</span>
          </div>
        </div>

      </aside>

      {/* Main content */}
      <main className="main-area">

        {/* Top bar */}
        <header className="topbar">

          <div className="breadcrumb">
            Workspace / <strong>Knowledge Hub</strong>
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

        {/* Page content */}
        <div className="page-content">
          {children}
        </div>

      </main>

    </div>
  );
}

export default SkillSwapLayout;