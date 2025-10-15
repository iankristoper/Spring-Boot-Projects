import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VerifiedIcon from "@mui/icons-material/Verified";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function VerifyReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/reports/${id}`)
      .then((res) => {
        setReport(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch report details", err);
        setLoading(false);
      });
  }, [id]);

  const handleVerifyNow = () => {
    setVerifying(true);
    axios
      .put(`http://localhost:8080/api/reports/verify/${id}`)
      .then(() => {
        alert("Report successfully verified!");
        navigate("/admin/AdminManageReports");
      })
      .catch((err) => {
        console.error("Verification failed", err);
        alert("Failed to verify report.");
        setVerifying(false);
      });
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "black",
          color: "yellow",
        }}
      >
        <CircularProgress sx={{ color: "yellow" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "black",
        color: "white",
        py: 4,
        px: { xs: 2, sm: 5 },
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 2, sm: 4 },
          bgcolor: "#1a1a1a",
          border: "1px solid rgba(255,255,0,0.3)",
          borderRadius: "12px",
        }}
      >
        {/* Header */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "yellow",
              borderColor: "yellow",
              "&:hover": { bgcolor: "rgba(255,255,0,0.1)" },
            }}
            onClick={() => navigate("/admin/AdminManageReports")}
          >
            Back
          </Button>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "yellow" }}>
            Verify Report
          </Typography>
        </Box>

        <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Report Details */}
        {report ? (
          <>
            <Typography variant="h5" sx={{ color: "yellow", mb: 1 }}>
              {report.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {report.description}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="gray">
                  Priority
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {report.priority
                    ? report.priority.charAt(0).toUpperCase() +
                      report.priority.slice(1).toLowerCase()
                    : "Low"}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="gray">
                  Status
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{
                    color:
                      report.status === "Resolved"
                        ? "#00e676"
                        : report.status === "Verified"
                        ? "orange"
                        : "red",
                  }}
                >
                  {report.status}
                </Typography>
              </Grid>

              {/* Optional user info */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="gray">
                  Reported By
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {report.userName || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="gray">
                  Contact Number
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {report.userContact || "N/A"}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

            {/* Actions */}
            <Box display="flex" justifyContent="center" gap={3}>
              <Button
                variant="contained"
                startIcon={<VerifiedIcon />}
                sx={{
                  bgcolor: "yellow",
                  color: "black",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "white" },
                }}
                onClick={handleVerifyNow}
                disabled={verifying}
              >
                {verifying ? "Verifying..." : "Verify Now"}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "gray",
                  color: "gray",
                  "&:hover": { borderColor: "white", color: "white" },
                }}
                onClick={() => navigate("/admin/AdminManageReports")}
              >
                Cancel
              </Button>
            </Box>
          </>
        ) : (
          <Typography color="gray">Report not found.</Typography>
        )}
      </Paper>
    </Box>
  );
}
