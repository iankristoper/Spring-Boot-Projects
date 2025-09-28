import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#0D0D0D", borderBottom: "1px solid #FFD700" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#FFD700" }}>
          Community Reporting App
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/signup">Signup</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
