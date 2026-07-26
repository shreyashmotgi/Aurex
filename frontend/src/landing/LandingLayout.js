import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Shared chrome for every public/marketing page. The dashboard has its
 * own layout (TopBar) and intentionally does NOT use this.
 */
function LandingLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default LandingLayout;
