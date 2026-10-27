import { NAV_MAIN, NAV_SPACE } from "../data.js";

function NavGroup({ title, items, page, onNavigate }) {
  return (
    <>
      <h6>{title}</h6>
      {items.map((it) => (
        <button
          key={it.id}
          className={page === it.id ? "on" : ""}
          aria-current={page === it.id ? "page" : undefined}
          onClick={() => onNavigate(it.id)}
        >
          <span className="ic" aria-hidden="true">{it.icon}</span>
          {it.label}
          {it.badge && <em>{it.badge}</em>}
        </button>
      ))}
    </>
  );
}

export default function Sidebar({ page, onNavigate }) {
  return (
    <aside className="side">
      <div className="logo">
        <img src="/logo.png" width="40" height="40" alt="" />
        SkillSwap
      </div>
      <div className="campus">
        <b>G</b>
        <div>
          <small>Your campus</small>
          <strong>GSFC University</strong>
        </div>
      </div>
      <nav className="nav" aria-label="Workspace">
        <NavGroup title="WORKSPACE" items={NAV_MAIN} page={page} onNavigate={onNavigate} />
        <NavGroup title="YOUR SPACE" items={NAV_SPACE} page={page} onNavigate={onNavigate} />
      </nav>
    </aside>
  );
}
