import { useContext, useMemo, useState } from "react";
import { AppContext } from "../components/context/AppContext.jsx";

export default function Employees() {
  const { employees } = useContext(AppContext);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    let list = [...employees];
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      list = list.filter((x) => (x.name + " " + x.email).toLowerCase().includes(s));
    }
    if (status !== "all") list = list.filter((x) => x.status === status);
    return list;
  }, [employees, q, status]);

  return (
    <div className="card fade-in">
      <h2 style={{ marginTop: 0 }}>Employees</h2>
      <p className="muted">This page is protected: only manager/employee can view it.</p>

      <div className="controls" style={{ gridTemplateColumns: "1fr 220px" }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or email..." />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="grid">
        {filtered.map((p) => (
          <div className="record-card" key={p.id}>
            <div className="record-top">
              <img className="avatar-sm" src={p.image} alt={p.name} />
              <div className="record-meta">
                <h3 className="title">{p.name}</h3>
                <p className="muted">{p.email}</p>
              </div>
              <span className={`badge ${p.status === "active" ? "active" : "inactive"}`}>{p.status}</span>
            </div>
            <p className="muted"><b>Role:</b> {p.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
