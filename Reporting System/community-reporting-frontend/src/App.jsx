import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import DashboardNavbar from "./components/DashboardNavbar"; 
import Reports from "./pages/Reports";
import "leaflet/dist/leaflet.css";








const PrivateRoute = ({ children, role }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const expiry = localStorage.getItem("expiry");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!isAuthenticated || !expiry || Date.now() > Number(expiry)) {
    // Clear any stale data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("expiry");

    // Redirect to login with state for session expired message
    return <Navigate to="/login" state={{ sessionExpired: true }} replace />;
  }

 // Role check
  if (role && user?.role !== role) {
    return (
      <Navigate
        to="/login"
        state={{ roleError: "You are not authorized to access this page." }}
        replace
      />
    );
  }

  return children;
};









export default function App() {
  const location = useLocation();
  const isDashboard =
  location.pathname.startsWith("/dashboard") ||
  location.pathname.startsWith("/reports");

  return (
    <>
      {/* ✅ Different navbars based on route */}
      {isDashboard ? <DashboardNavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute role="ROLE_USER">
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* ✅ Protected reports */}
        <Route
          path="/reports"
          element={
            <PrivateRoute role="ROLE_USER">
              <Reports />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
