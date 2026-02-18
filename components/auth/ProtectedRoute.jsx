import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user } = useContext(AppContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="page">
        <div className="card">
          <h2>Not authorized</h2>
          <p className="muted">Only {allowedRoles.join(" / ")} can view this page.</p>
        </div>
      </div>
    );
  }

  return children;
}
