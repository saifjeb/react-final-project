
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  const { sidebarCollapsed } = useContext(AppContext);

  return (
    <div className={`app-shell ${sidebarCollapsed ? "collapsed" : ""}`}>
      <a className="skip-link" href="#content">Skip to content</a>
      <Sidebar />
      <div className="main-area">
        <Header />
        <main id="content" className="page">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
