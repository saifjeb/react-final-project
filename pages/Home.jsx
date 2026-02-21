import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="card hero fade-in">
      <h1>Welcome to Aura Cafe</h1>
      <p className="muted">A clean Vite + React front-end and simple role login.</p>

      <div className="row wrap" style={{ marginTop: 12 }}>
        <button className="btn" onClick={() => navigate("/contact")}>Add New Record</button>
        <button className="btn secondary" onClick={() => navigate("/menu")}>View Dashboard</button>
      </div>

      <div className="divider" />

      <div className="features">
        <div className="mini-card">
          <strong>Sidebar</strong>
          <p className="muted">Open/close smoothly, keeps your layout stable.</p>
        </div>
        <div className="mini-card">
          <strong>Login</strong>
          <p className="muted">Simple roles: manager / employee / customer.</p>
        </div>
        <div className="mini-card">
          <strong>Pages</strong>
          <p className="muted">Menu dashboard, employees (protected), contact form, preview.</p>
        </div>
      </div>
    </div>
  );
}
