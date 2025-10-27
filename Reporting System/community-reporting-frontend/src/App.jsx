import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/homepage/Home";
import Dashboard from "./pages/user/UserReports/Dashboard";
import AdminNavbar from "./components/AdminNavbar";
import HomeNavbar from "./components/HomeNavbar";
import UserNavbar from "./components/UserNavbar"; 
import Reports from "./pages/user/UserReports/Reports";
import "leaflet/dist/leaflet.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import ViewReport from "./components/ViewReport";
import Analytics from "./pages/user/UserReports/Analytics";
import About from "./pages/user/UserReports/About";
import Contact from "./pages/user/UserReports/Contact";
import Feed from "./pages/user/UserReports/Feed";
import News from "./pages/user/UserReports/News";
import AdminHome from "./pages/admin/AdminHome";
import AdminManageReports from "./pages/admin/AdminManageReports/AdminManageReports";
import ViewReportAdmin from "./components/ViewReportAdmin";
import ComingSoon from "./components/ComingSoon";
import AdminManageNews from "./pages/admin/NewsAndUpdates/AdminManageNews";
import Archives from "./pages/admin/AdminManageReports/components/ArchivePage/Archives";
import AdminRecentLog from "./pages/admin/AdminManageReports/components/LogsPage/AdminRecentLog";
import HomeComingSoon from "./components/HomeComingSoon";




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

  const isUserDashboard =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/reports");

  
  const isAdminDashboard =
    location.pathname.startsWith("/admin");

  return (
    <>
      {/* ✅ Choose navbar based on route */}
      {isUserDashboard ? (
        <UserNavbar />  // User navbar
      ) : isAdminDashboard ? (
        <AdminNavbar />      // Admin navbar
      ) : (
        <HomeNavbar />           // Homepage / public navbar
      )}

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


        <Route
          path="/admin/manage-news"
          element={
            <PrivateRoute role="ROLE_ADMIN">
              <AdminManageNews />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/archives"
          element={
            <PrivateRoute role="ROLE_ADMIN">
              <Archives />
            </PrivateRoute>
          }
        />

        
        <Route
          path="/admin/activity-log"
          element={
            <PrivateRoute role="ROLE_ADMIN">
              <AdminRecentLog />
            </PrivateRoute>
          }
        />

           
        <Route
          path="/admin/admin-reports"
          element={
            <PrivateRoute role="ROLE_ADMIN">
              <AdminManageReports />
            </PrivateRoute>
          }
        />


        <Route
          path="/admin/manage-users"
          element={
            <PrivateRoute role="ROLE_ADMIN">
              <HomeComingSoon />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/manage-dashboard"
          element={
            <PrivateRoute role="ROLE_ADMIN">
              <HomeComingSoon />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/manage-messages"
          element={
            <PrivateRoute role="ROLE_ADMIN">
              <HomeComingSoon />
            </PrivateRoute>
          }
        />


        <Route
          path="/admin/manage-settings"
          element={
            <PrivateRoute role="ROLE_ADMIN">
              <HomeComingSoon />
            </PrivateRoute>
          }
        />

        


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>

    
  );
}
