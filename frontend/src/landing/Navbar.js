import React from "react";
import { Link } from "react-router-dom";

import AppCard from "../components/AppCard";
import MenuSection from "../components/MenuSection";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg border-bottom sticky-top shadow-sm">
      <div className="container py-1">
        {/* Logo */}

        <Link className="navbar-brand" to="/">
          <img
            src="/media/images/aurex.png"
            alt="Zerodha"
            style={{ width: "130px" }}
          />
        </Link>

        {/* Mobile */}

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <i className="bi bi-list fs-2 text-white"></i>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center">
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link className="nav-link" to="/pricing">
                Pricing
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link className="nav-link" to="/support">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
