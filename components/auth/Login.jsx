import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

export default function Login() {
  const { login, user, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState("customer");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const from = location.state?.from || "/";

  const onSubmit = (e) => {
    e.preventDefault();
    const res = login({ role, name, password });
    if (!res.ok) {
      setError(res.message);
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h2>Sign in</h2>
        <p className="muted">
          This is a front-end demo (no backend). Passwords: <b>manager</b>, <b>employee</b>, <b>customer</b>.
        </p>

        {user ? (
          <div className="error" style={{ background: "rgba(46, 204, 113, 0.12)", borderColor: "rgba(46, 204, 113, 0.25)" }}>
            You are signed in as <b>{user.name}</b> ({user.role}).
            <div style={{ marginTop: 10 }}>
              <button className="btn secondary" onClick={logout}>
                Sign out
              </button>
            </div>
          </div>
        ) : null}

        <form className="form" onSubmit={onSubmit}>
          <label>
            Role
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="customer">Customer</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </label>

          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)}  />
          </label>

          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Try: customer" />
          </label>

          {error ? <div className="error">{error}</div> : null}

          <div className="row wrap">
            <button className="btn" type="submit">Sign in</button>
            <button className="btn secondary" type="button" onClick={() => navigate("/")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
