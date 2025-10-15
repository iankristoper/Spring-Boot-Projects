import React from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import useSessionTimeout from "../../hooks/useSessionTimeout";



export default function AdminHome() {

  useSessionTimeout(3600000); // 1 hour inactivity
  const navigate = useNavigate();

  const cards = [
    {
      title: "Manage Reports",
      desc: "View, verify, mark as resolved, or delete submitted reports.",
      icon: <AssignmentIcon />,
      button: "Open Reports",
      path: "/admin/manage-reports",
    },
    {
      title: "Manage Users",
      desc: "View reporters, manage access, or suspend user accounts.",
      icon: <PeopleIcon />,
      button: "Open Users",
      path: "/admin/users",
    },
    {
      title: "Dashboard / Analytics",
      desc: "Monitor report trends, categories, and system analytics.",
      icon: <BarChartIcon />,
      button: "Open Dashboard",
      path: "/admin/dashboard",
    },
    {
      title: "News & Updates",
      desc: "Add, edit, or publish local community news posts.",
      icon: <ArticleIcon />,
      button: "Manage News",
      path: "/admin/news",
    },
    {
      title: "Messages / Notifications",
      desc: "View messages or feedback sent from the contact form.",
      icon: <NotificationsIcon />,
      button: "View Messages",
      path: "/admin/messages",
    },
    {
      title: "Settings / Profile",
      desc: "Update admin profile, password, and system settings.",
      icon: <SettingsIcon />,
      button: "Open Settings",
      path: "/admin/settings",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 3, mb: 4, flex: 1 }}>
        {/* Header */}
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: "16px",
            bgcolor: "black",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "yellow", fontSize: { xs: "1.6rem", sm: "2rem" } }}
          >
            Admin Control Panel
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: { xs: 2, sm: 3 },
              fontWeight: "bold",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Welcome back, Administrator 👋
          </Typography>
        </Paper>

        {/* Responsive Equal Grid */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
          sx={{
            mt: 3,
          }}
        >
          {cards.map((card, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Paper
                elevation={5}
                sx={{
                  width: "100%",
                  maxWidth: 360, // FIXED WIDTH for consistency
                  p: { xs: 3, sm: 4 },
                  textAlign: "center",
                  borderRadius: "16px",
                  bgcolor: "background.paper",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minHeight: 300, // consistent height for all cards
                  transition: "transform 0.25s, box-shadow 0.25s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0px 8px 20px rgba(255, 255, 0, 0.25)",
                  },
                }}
              >
                <Box>
                  {React.cloneElement(card.icon, {
                    sx: { fontSize: 55, color: "yellow" },
                  })}
                </Box>

                <Box sx={{ mt: 2, flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "1.1rem", sm: "1.25rem" },
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      mb: 2,
                      fontSize: { xs: "0.85rem", sm: "0.95rem" },
                      color: "text.secondary",
                    }}
                  >
                    {card.desc}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  onClick={() => navigate(card.path)}
                  sx={{
                    bgcolor: "black",
                    color: "yellow",
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: "bold",
                    py: 1,
                    width: "100%",
                    "&:hover": {
                      bgcolor: "#1a1a1a",
                    },
                  }}
                >
                  {card.button}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Sticky Footer */}
      <Box
        component="footer"
        sx={{
          flexShrink: 0,
          py: 2,
          textAlign: "center",
          color: "gray",
          fontSize: "0.8rem",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        © 2025 Community Reporting App — Admin Portal
      </Box>
    </Box>
  );
}
