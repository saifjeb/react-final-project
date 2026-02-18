import { useContext, useMemo, useState } from "react";
import { AppContext } from "../components/context/AppContext.jsx";

export default function Menu() {
  const { menuItems, setMenuItems, user } = useContext(AppContext);

  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");

  const categories = useMemo(() => {
    const set = new Set(menuItems.map((x) => x.category));
    return ["all", ...Array.from(set)];
  }, [menuItems]);

  const filtered = useMemo(() => {
    let list = [...menuItems];

    if (q.trim()) {
      const s = q.trim().toLowerCase();
      list = list.filter((x) => (x.name + " " + x.description).toLowerCase().includes(s));
    }

    if (category !== "all") list = list.filter((x) => x.category === category);
    if (status !== "all") list = list.filter((x) => x.status === status);

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [menuItems, q, category, status, sort]);

  const canEdit = user?.role === "manager";

  const toggleStatus = (id) => {
    setMenuItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, status: x.status === "available" ? "inactive" : "available" } : x))
    );
  };

  return (
    <div className="card fade-in">
      <div className="row space-between wrap">
        <div>
          <h2 style={{ margin: 0 }}>Menu</h2>
          <p className="muted">Browse items and check availability. {canEdit ? "Managers can edit." : "Sign in as manager to edit."}</p>
        </div>
        <div className="stat">
          <div className="small muted">Total</div>
          <strong>{menuItems.length}</strong>
        </div>
      </div>

      <div className="controls">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or description..." />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c === "all" ? "All categories" : c}</option>
          ))}
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="inactive">Inactive</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="name">Name</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      <div className="grid">
        {filtered.map((item) => (
          <div className="record-card" key={item.id}>
            <div className="record-top">
              <img className="avatar-sm" src={item.image} alt={item.name} />
              <div className="record-meta">
                <h3 className="title">{item.name} <span className="small muted">— ${item.price.toFixed(2)}</span></h3>
                <p className="muted">{item.description}</p>
              </div>
              <span className={`badge ${item.status === "available" ? "active" : "inactive"}`}>{item.status}</span>
            </div>

            <div className="divider" />

            <p className="muted"><b>Category:</b> {item.category}</p>

            <div className="row wrap space-between">
              <p className="muted" style={{ margin: 0 }}>{canEdit ? "" : "Sign in as manager to edit menu items."}</p>
              {canEdit ? (
                <button className="btn secondary" onClick={() => toggleStatus(item.id)}>
                  Toggle status
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 ? <p className="muted">No results.</p> : null}
    </div>
  );
}
