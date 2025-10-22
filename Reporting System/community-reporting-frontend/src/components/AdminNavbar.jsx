import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("expiry");
    navigate("/");
  };

  const navItems = [
    { text: "Profile", path: "/admin/profile" },
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
        backdropFilter: "blur(12px)",
        bgcolor: "rgba(20,20,20,0.9)",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        boxShadow: "0 -2px 10px rgba(255, 255, 0, 0.1)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          my: 4,
          fontWeight: 500,
          color: "yellow",
          textShadow: "0 0 6px rgba(255,255,0,0.6)",
        }}
      >
        Admin Menu
      </Typography>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />

      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ justifyContent: "center" }}>
            <ListItemButton
              component={item.path ? Link : "button"}
              to={item.path || undefined}
              onClick={item.action || undefined}
              sx={{
                textAlign: "center",
                borderRadius: "14px",
                bgcolor: "rgba(255,255,255,0.05)",
                color: "white",
                m: 1,
                transition: "all 0.25s ease",
                "&:hover": {
                  bgcolor: "yellow",
                  color: "black",
                  fontWeight: "bold",
                  transform: "translateY(-2px)",
                  boxShadow: "0 2px 12px rgba(255,255,0,0.3)",
                },
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  textAlign: "center",
                  fontWeight: 500,
                }}
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Typography variant="caption" sx={{ mb: 2, color: "gray" }}>
        © 2025 Reporting App
      </Typography>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "rgba(15, 15, 15, 0.85)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,0,0.3)",
          boxShadow: "0 2px 8px rgba(255,255,0,0.05)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo / Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "yellow",
              letterSpacing: "0.5px",
              textShadow: "0 0 4px rgba(255,255,0,0.6)",
            }}
          >
            {/* Reporting App */}
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {navItems.map((item) =>
              item.path ? (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: "white",
                    fontWeight: 300,
                    textTransform: "none",
                    borderRadius: "10px",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      bgcolor: "yellow",
                      color: "black",
                      boxShadow: "0 2px 10px rgba(255,255,0,0.3)",
                    },
                  }}
                >
                  {item.text}
                </Button>
              ) : (
                <Button
                  key={item.text}
                  onClick={item.action}
                  sx={{
                    color: "white",
                    fontWeight: 300,
                    textTransform: "none",
                    borderRadius: "10px",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      bgcolor: "yellow",
                      color: "black",
                      boxShadow: "0 2px 10px rgba(255,255,0,0.3)",
                    },
                  }}
                >
                  {item.text}
                </Button>
              )
            )}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            edge="end"
            sx={{
              display: { sm: "none" },
              transition: "transform 0.2s ease",
              "&:hover": { transform: "scale(1.1)" },
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            height: "45vh",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            borderTop: "1px solid rgba(255,255,0,0.3)",
            overflow: "hidden",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
