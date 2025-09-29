import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import HistoryIcon from "@mui/icons-material/History";
import useSessionTimeout from "../hooks/useSessionTimeout";


export default function Dashboard() {

  useSessionTimeout(3600000); // 1 hour inactivity

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: "16px",
          bgcolor: "black",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ color: "yellow" }}>
          Community Reporting Dashboard
        </Typography>
        <Typography variant="body1" sx={{ mt: 5, fontWeight: "bold" }}>
          Welcome back, User 👋
        </Typography>
      </Paper>

      {/* Action Cards */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        {/* Feed */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: "16px",
              bgcolor: "background.paper",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <DynamicFeedIcon sx={{ fontSize: 50, color: "yellow" }} />
            <Box>
              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                Feed
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                Browse reports from the community.
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{ bgcolor: "black", color: "yellow", borderRadius: "12px" }}
              fullWidth
            >
              View Feed
            </Button>
          </Paper>
        </Grid>

        {/* My Reports */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: "16px",
              bgcolor: "background.paper",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <AssignmentTurnedInIcon sx={{ fontSize: 50, color: "yellow" }} />
            <Box>
              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                My Reports
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                Track and manage your submitted reports.
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{ bgcolor: "black", color: "yellow", borderRadius: "12px" }}
              fullWidth
            >
              View Reports
            </Button>
          </Paper>
        </Grid>

        {/* Report History */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: "16px",
              bgcolor: "background.paper",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <HistoryIcon sx={{ fontSize: 50, color: "yellow" }} />
            <Box>
              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                Report History
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                View past reports and resolutions.
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{ bgcolor: "black", color: "yellow", borderRadius: "12px" }}
              fullWidth
            >
              View History
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
