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
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";  // ⬅️ add this at top with other imports


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: "Home", path: "/" },
    { text: "Login", path: "/login" },
    { text: "Signup", path: "/signup" },
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
        {/* Home Panel*/}
      </Typography>
      

      {/* Nav Buttons */}
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ justifyContent: "center" }}>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                textAlign: "center",
                borderRadius: "20px",
                bgcolor: "#0D0D0D", // black
                color: "white",
                m: 1,
                "&:hover": {
                  bgcolor: "yellow",
                  color: "black", // flip colors on hover
                  fontWeight: "bold",
                },
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  //fontWeight: "bold",
                  textAlign: "center",
                }}
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>

        ))}
      </List>

      {/* Footer */}
      <Typography
        variant="caption"
        sx={{ mb: 1, color: "gray" }}
      >
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
          <Box sx={{ display: { xs: "none", sm: "block"} }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{ fontWeight: "bold" }}   // 🔥 make desktop links bold
              >
                {item.text}
              </Button>
            ))}
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
            height: "40vh", // bottom sheet height
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
