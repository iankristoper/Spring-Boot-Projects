import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: "16px",
          bgcolor: "black",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ color: "yellow" }}>
          Community Reporting Dashboard
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Welcome back, User 👋
        </Typography>
      </Paper>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: "16px",
              bgcolor: "background.paper",
            }}
          >
            <ReportProblemIcon sx={{ fontSize: 50, color: "yellow" }} />
            <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
              Submit Report
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
              File a new community report quickly.
            </Typography>
            <Button
              variant="contained"
              sx={{ bgcolor: "black", color: "yellow", borderRadius: "12px" }}
              fullWidth
            >
              Report Now
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: "16px",
              bgcolor: "background.paper",
            }}
          >
            <AssignmentTurnedInIcon sx={{ fontSize: 50, color: "yellow" }} />
            <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
              My Reports
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
              View and track the status of your reports.
            </Typography>
            <Button
              variant="contained"
              sx={{ bgcolor: "black", color: "yellow", borderRadius: "12px" }}
              fullWidth
            >
              View Reports
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: "16px",
              bgcolor: "background.paper",
            }}
          >
            <HistoryIcon sx={{ fontSize: 50, color: "yellow" }} />
            <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
              Report History
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
              Check past reports and resolutions.
            </Typography>
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

      {/* Profile Section */}
      <Paper
        elevation={3}
        sx={{
          mt: 5,
          p: 3,
          borderRadius: "16px",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          <AccountCircleIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          My Profile
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1">👤 Name: John Doe</Typography>
        <Typography variant="body1">📧 Email: johndoe@email.com</Typography>
        <Typography variant="body1">🏠 Community: Sample Barangay</Typography>
        <Button
          variant="outlined"
          sx={{
            mt: 2,
            borderColor: "black",
            color: "black",
            borderRadius: "12px",
          }}
        >
          Edit Profile
        </Button>
      </Paper>
    </Container>
  );
}
