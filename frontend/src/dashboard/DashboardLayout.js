import React from "react";

import TopBar from "./TopBar";
import Dashboard from "./Dashboard";

// Dashboard's own stylesheet — previously never imported anywhere, so the
// dashboard was rendering unstyled. Scoped to this layout so it only
// applies within /dashboard/*.
import "./dashboard.css";

/**
 * Layout for everything under /dashboard/*. Deliberately does NOT render
 * the landing Navbar/Footer — the dashboard has its own TopBar/Menu.
 */
function DashboardLayout() {
  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
}

export default DashboardLayout;
