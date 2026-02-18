import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const topLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
  { to: "/about", label: "About" },
];

export default function Header() {
  const { theme, setTheme, user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-left">
        <div className="row" style={{ gap: 10 }}>
          <span className="brand-dot" aria-hidden="true" />
          <strong style={{ whiteSpace: "nowrap" }}>Aura Cafe</strong>
        </div>
      </div>

      <div className="row wrap" style={{ justifyContent: "flex-end" }}>
        <button
          className="icon-btn"
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          title="Toggle theme"
          aria-label="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <button className="btn secondary" onClick={() => navigate("/login")}>
          {user ? `${user.role}: ${user.name}` : "Sign in"}
        </button>
      </div>
    </header>
  );
}