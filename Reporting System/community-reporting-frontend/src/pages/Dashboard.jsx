import React from "react";
import { Container, Paper, Typography, Button, Box, Stack } from "@mui/material";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import HistoryIcon from "@mui/icons-material/History";
import useSessionTimeout from "../hooks/useSessionTimeout";
import { useNavigate } from "react-router-dom";




export default function Dashboard() {
  useSessionTimeout(3600000); // 1 hour inactivity

  const navigate = useNavigate();


  const cards = [
    {
      title: "Feed",
      desc: "Browse reports from the community.",
      icon: <DynamicFeedIcon sx={{ fontSize: 50, color: "yellow" }} />,
      button: "View Feed",
      path: "/feed",   // later you’ll create Feed.jsx
    },
    {
      title: "My Reports",
      desc: "Track and manage your submitted reports.",
      icon: <AssignmentTurnedInIcon sx={{ fontSize: 50, color: "yellow" }} />,
      button: "View Reports",
      path: "/reports",   // 👈 this will open Reports.jsx
    },
    {
      title: "Report History",
      desc: "View past reports and resolutions.",
      icon: <HistoryIcon sx={{ fontSize: 50, color: "yellow" }} />,
      button: "View History",
      path: "/history",
    },
  ];


  return (
    <Box
      sx={{
        minHeight: "100vh",        // take full height
        display: "flex",
        flexDirection: "column",   // stack content + footer
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
        {/* Header */}
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: "16px",
            bgcolor: "black",
            color: "white",
            textAlign: "center",
            wordWrap: "break-word",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "yellow", fontSize: { xs: "1.5rem", sm: "2rem" } }}
          >
            Reporting Dashboard
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: { xs: 2, sm: 3 },
              fontWeight: "bold",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Welcome back, User 👋
          </Typography>
        </Paper>

        {/* Action Cards */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          {cards.map((card, index) => (
            <Box
              key={index}
              sx={{
                flex: 1,
                minWidth: { xs: "280px", sm: "0" },
                maxWidth: { xs: "100%", sm: "320px" },
                alignSelf: "stretch",
              }}
            >
              <Paper
                elevation={4}
                sx={{
                  p: { xs: 3, sm: 4 },
                  textAlign: "center",
                  borderRadius: "16px",
                  bgcolor: "background.paper",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "100%",
                  wordWrap: "break-word",
                }}
              >
                {card.icon}
                <Box sx={{ mt: 2, flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "1rem", sm: "1.2rem" },
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
                    }}
                  >
                    {card.desc}
                  </Typography>
                </Box>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "black",
                      color: "yellow",
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: "bold",
                      py: 1,
                    }}
                    fullWidth
                    onClick={() => navigate(card.path)}   // 👈 this is the key
                  >
                    {card.button}
                  </Button>

              </Paper>
            </Box>
          ))}
        </Stack>
      </Container>

      {/* Footer pinned at bottom */}
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          color: "text.secondary",
          py: 2,
        }}
      >
        <Typography variant="body2">
          © 2025 Community Reporting App
        </Typography>
      </Box>
    </Box>
  );
}
