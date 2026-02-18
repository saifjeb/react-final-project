import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/context/AppContext.jsx";

const fallbackImg = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=60";

export default function Reservation() {
  const { draftReservation } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="card fade-in" style={{ maxWidth: 780, margin: "0 auto" }}>
      <h2 style={{ marginTop: 0 }}>Preview</h2>

      <div className="preview">
        <img className="avatar" src={draftReservation.imageUrl || fallbackImg} alt="Preview" />
        <div className="preview-info">
          <h3 style={{ margin: 0 }}>{draftReservation.name || "ali ahmad"}</h3>
          <div className="divider" />
          <p><b>Name:</b> {draftReservation.name || "ali ahmad"}</p>
          <p><b>Email:</b> {draftReservation.email || "ali@example.com"}</p>
          <p><b>Role:</b> {draftReservation.role}</p>
          <p><b>Status:</b> <span className={draftReservation.status === "active" ? "muted" : "muted"}>{draftReservation.status}</span></p>
        </div>
      </div>

      <div className="row wrap" style={{ justifyContent: "center" }}>
        <button className="btn" onClick={() => alert("Saved.")}>Confirm & Save</button>
        <button className="btn secondary" onClick={() => navigate("/contact")}>Edit</button>
      </div>
    </div>
  );
}
