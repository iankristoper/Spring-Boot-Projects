import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function DashboardNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ❌ Clear session data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("expiry");

    // 🔄 Redirect to home (or login if you prefer)
    navigate("/");
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#0D0D0D", borderBottom: "1px solid yellow" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "yellow" }}>
          Community Reporting App
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/dashboard">
            Profile
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
