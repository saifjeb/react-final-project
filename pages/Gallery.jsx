const pics = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=60",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=60",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=60",
];

export default function Gallery() {
  return (
    <div className="card fade-in">
      <h2 style={{ marginTop: 0 }}>Gallery</h2>
      <p className="muted">A tiny gallery layout.</p>

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {pics.map((src, idx) => (
          <div className="record-card" key={src}>
            <img src={src} alt={`Gallery ${idx + 1}`} style={{ width: "100%", borderRadius: 14, border: "1px solid var(--border)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
