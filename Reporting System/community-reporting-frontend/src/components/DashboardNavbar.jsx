import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

export default function DashboardNavbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    // clear session
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("expiry");

    navigate("/"); // redirect to home or login
  };

  const navItems = [
    { text: "Profile", path: "/dashboard" },
    { text: "Logout", action: handleLogout },
  ];

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* App Title */}
      <Typography
        variant="h6"
        sx={{ my: 2, fontWeight: 700, color: "yellow" }}
      >
        Dashboard Menu
      </Typography>

      {/* Nav Buttons */}
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ justifyContent: "center" }}>
            <ListItemButton
              component={item.path ? Link : "button"}
              to={item.path || undefined}
              onClick={item.action || undefined}
              sx={{
                textAlign: "center",
                borderRadius: "20px",
                bgcolor: "#0D0D0D",
                color: "white",
                m: 1,
                "&:hover": {
                  bgcolor: "yellow",
                  color: "black",
                  fontWeight: "bold",
                },
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  textAlign: "center",
                }}
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Footer */}
      <Typography variant="caption" sx={{ mb: 1, color: "gray" }}>
        © 2025 Reporting App
      </Typography>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ bgcolor: "#0D0D0D", borderBottom: "1px solid yellow" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Title */}
          <Typography variant="h6" sx={{ fontWeight: 600, color: "yellow" }}>
            Community Reporting App
          </Typography>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) =>
              item.path ? (
                <Button
                  key={item.text}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  sx={{ fontWeight: "bold" }}
                >
                  {item.text}
                </Button>
              ) : (
                <Button
                  key={item.text}
                  color="inherit"
                  onClick={item.action}
                  sx={{ fontWeight: "bold" }}
                >
                  {item.text}
                </Button>
              )
            )}
          </Box>

          {/* Mobile Hamburger */}
          <IconButton
            color="inherit"
            edge="end"
            sx={{ display: { sm: "none" }, fontWeight: "bold" }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            height: "40vh",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            padding: 2,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
