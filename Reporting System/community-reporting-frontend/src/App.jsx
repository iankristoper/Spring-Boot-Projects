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
import 'mapbox-gl/dist/mapbox-gl.css';
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import ViewReport from "./components/ViewReport";
import Analytics from "./pages/Analytics";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Feed from "./pages/Feed";
import News from "./pages/News";
import AdminHome from "./pages/admin/AdminHome";
import AdminManageReports from "./pages/admin/AdminManageReports";
import ViewReportAdmin from "./components/ViewReportAdmin";
import ComingSoon from "./components/ComingSoon";





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

        {/* ✅ Protected single report view */}
        <Route
          path="/reports/:id"
          element={
            <PrivateRoute role="ROLE_USER">
              <ViewReport />
            </PrivateRoute>
          }
        />


        {/* ✅ Protected reports */}
        <Route
          path="/analytics"
          element={
            <PrivateRoute role="ROLE_USER">
              <Analytics />
            </PrivateRoute>
          }
        />

        {/* Public About */}
        <Route
          path="/about"
          element={
              <About />
          }
        />

        {/* Public Contact */}
        <Route
          path="/contact"
          element={
              <Contact />
          }
        />


        
        {/* Proctected Feed*/}
        <Route
          path="/feed"
          element={
            <PrivateRoute role="ROLE_USER">
              <Feed />
            </PrivateRoute>
          }
        />

        {/* Proctected News*/}
        <Route
          path="/news"
          element={
            <PrivateRoute role="ROLE_USER">
              <News />
            </PrivateRoute>
          }
        />





        {/*  ADMIN Route */}

        <Route
          path="/admin"
          element={
            <PrivateRoute role="ROLE_ADMIN">
              <AdminHome />
            </PrivateRoute>
          }
        />


        <Route
          path="/admin/manage-reports"
          element={
            <PrivateRoute role="ROLE_ADMIN">
              <AdminManageReports />
            </PrivateRoute>
          }
        />

        {/* Protected single report view */}
        <Route
          path="/admin/reports/:id"
          element={
            <PrivateRoute role="ROLE_ADMIN">
              <ViewReportAdmin />
            </PrivateRoute>
          }
        />

        {/* Coming soon */}
        <Route
          path="/admin/reports/verify/:id"
          element={
            <PrivateRoute role="ROLE_ADMIN">
              <ComingSoon />
            </PrivateRoute>
          }
        />

        {/* Admin Home*/}
        <Route
          path="/admin/admin-home"
          element={
            <PrivateRoute role="ROLE_ADMIN">
              <AdminHome />
            </PrivateRoute>
          }
        />

        


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>

    
  );
}
