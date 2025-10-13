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
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";





export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Contact", path: "/contact" },
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
        bgcolor: "rgba(15,15,15,0.9)",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        boxShadow: "0 -2px 10px rgba(255, 255, 0, 0.1)",
      }}
    >
      {/* App Title */}
      <Typography
        variant="h6"
        sx={{
          my: 2,
          fontWeight: 600,
          color: "yellow",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          textShadow: "0 0 6px rgba(255,255,0,0.5)",
        }}
      >
        <HomeIcon sx={{ fontSize: 30 }} /> Reporting App
      </Typography>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />

      {/* Nav Buttons */}
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ justifyContent: "center" }}>
            <ListItemButton
              component={Link}
              to={item.path}
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

      {/* Footer */}
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
          {/* Title / Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <HomeIcon sx={{ color: "yellow" }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 510,
                color: "yellow",
                letterSpacing: "0.5px",
                textShadow: "0 0 4px rgba(255,255,0,0.6)",
              }}
            >
              {/*Get Started*/}
            </Typography>
          </Box>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
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
            ))}
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
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
