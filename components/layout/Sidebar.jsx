import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const links = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/menu", label: "Menu", icon: "🍽️" },
  { to: "/employees", label: "Employees", icon: "👥" },
  { to: "/gallery", label: "Gallery", icon: "🖼️" },
  { to: "/contact", label: "Contact", icon: "✉️" },
  { to: "/about", label: "About", icon: "ℹ️" },
];

export default function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed, user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand" title="Aura Cafe">
          <span className="brand-dot" aria-hidden="true" />
          <span>Aura Cafe</span>
        </div>

        <button
          className="icon-btn"
          onClick={() => setSidebarCollapsed((v) => !v)}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={sidebarCollapsed ? "Expand" : "Collapse"}
          style={{ background: "rgba(255,255,255,0.08)", color: "#fff", borderColor: "rgba(255,255,255,0.14)" }}
        >
          {sidebarCollapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      <nav className="sidebar-links" aria-label="Sidebar">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => `side-link ${isActive ? "active" : ""}`}
          >
            <span className="ico" aria-hidden="true">{l.icon}</span>
            <span className="side-label">{l.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="row wrap">
          {user ? (
            <button
              className="btn secondary"
              onClick={() => {
                logout();
                navigate("/");
              }}
              style={{ width: "100%" }}
            >
              Sign out
            </button>
          ) : (
            <button className="btn" onClick={() => navigate("/login")} style={{ width: "100%" }}>
              Sign in
            </button>
          )}
        </div>

        <div className="sidebar-foot">© {new Date().getFullYear()} Aura Cafe</div>
      </div>
    </aside>
  );
}