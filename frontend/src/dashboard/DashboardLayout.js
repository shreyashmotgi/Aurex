import React from "react";

import TopBar from "./TopBar";
import Dashboard from "./Dashboard";
import AIAssistant from "../components/AiAssistant";

import "./dashboard.css";

function DashboardLayout() {
  return (
    <>
      <TopBar />
      <Dashboard />
      <AIAssistant/>
    </>
  );
}

export default DashboardLayout;
