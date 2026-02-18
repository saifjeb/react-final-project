import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Employees from "./pages/Employees.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import Reservation from "./pages/Reservation.jsx";
import About from "./pages/About.jsx";
import Login from "./components/auth/Login.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/employees"
          element={
            <ProtectedRoute allowedRoles={["manager", "employee"]}>
              <Employees />
            </ProtectedRoute>
          }
        />
        
        <Route path="/dashboard" element={<Navigate to="/menu" replace />} />
        <Route path="/form" element={<Navigate to="/contact" replace />} />
        <Route path="/preview" element={<Navigate to="/reservation" replace />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

