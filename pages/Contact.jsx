import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/context/AppContext.jsx";

export default function Contact() {
  const { draftReservation, setDraftReservation } = useContext(AppContext);
  const navigate = useNavigate();

  const update = (k, v) => setDraftReservation((p) => ({ ...p, [k]: v }));

  return (
    <div className="card fade-in" style={{ maxWidth: 720, margin: "0 auto" }}>
      <h2 style={{ marginTop: 0 }}>Add New Record</h2>
      <p className="muted">Fill the form then preview before saving (front-end only).</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <label>
          Name
          <input value={draftReservation.name} onChange={(e) => update("name", e.target.value)}  />
        </label>

        <label>
          Email
          <input value={draftReservation.email} onChange={(e) => update("email", e.target.value)} />
        </label>

        <label>
          Role
          <select value={draftReservation.role} onChange={(e) => update("role", e.target.value)}>
            <option value="customer">Customer</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
        </label>

        <label>
          Status
          <select value={draftReservation.status} onChange={(e) => update("status", e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>

        <label>
          Image URL (optional)
          <input value={draftReservation.imageUrl} onChange={(e) => update("imageUrl", e.target.value)} placeholder="https://..." />
        </label>

        <div className="row wrap" style={{ justifyContent: "center", marginTop: 6 }}>
          <button className="btn" type="button" onClick={() => navigate("/reservation")}>Preview</button>
        </div>
      </form>
    </div>
  );
}
