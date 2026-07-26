import React from "react";
import { Route, Routes } from "react-router-dom";

import LandingLayout from "../landing/LandingLayout";
import NotFound from "../landing/NotFound";
import HomePage from "../landing/home/HomePage";
import AboutPage from "../landing/about/AboutPage";
import ProductPage from "../landing/products/ProductPage";
import PricingPage from "../landing/pricing/PricingPage";
import SupportPage from "../landing/support/SupportPage";
import SignUp from "../landing/signup/SignUp";
import EmailVerified from "../pages/EmailVerified";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

import Login from "../pages/Login";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../dashboard/DashboardLayout";

function AppRoutes() {
  return (
    <Routes>
      {/* Public / marketing site — gets the landing Navbar + Footer */}
      <Route element={<LandingLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/email-verified" element={<EmailVerified />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Protected app — its own layout, no landing chrome */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
