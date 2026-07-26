import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const Menu = () => {
  const { user, logout } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
    // Close the mobile menu after a link is tapped so the newly
    // routed page (Dashboard/Orders/Holdings/etc.) is immediately
    // visible instead of staying hidden behind the open nav overlay.
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // These are relative to the "/dashboard" parent route (no leading
  // slash), so they resolve to "/dashboard/orders", "/dashboard/holdings",
  // etc. instead of navigating away to the landing site's top-level routes.
  return (
    <div className="menu-container">
      <img
        src="/media/images/kite-logo.svg"
        alt="logo"
        style={{ width: "50px" }}
      />

      <button
        type="button"
        className="mobile-menu-btn"
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
        onClick={handleMobileMenuToggle}
      >
        &#9776;
      </button>

      <div className={isMobileMenuOpen ? "menus show" : "menus"}>
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          {/* <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li> */}
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          {/* <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li> */}
        </ul>
        <hr />
        <div className="profile-wrapper" style={{ position: "relative" }}>
          <div className="profile" onClick={handleProfileClick}>
            <div className="avatar">{getInitials(user?.fullName)}</div>
          </div>

          {isProfileDropdownOpen && (
            <div
              className="profile-dropdown"
              style={{
                position: "absolute",
                right: 0,
                top: "100%",
                marginTop: "8px",
                background: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: "6px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                minWidth: "160px",
                zIndex: 100,
              }}
            >
              <button
                type="button"
                onClick={logout}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
