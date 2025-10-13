import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Chip,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Feed() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatLabel = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/reports/fetch_all", {
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data?.reports || res.data || [];
        // Sort: Pending first, Resolved last
        const sorted = data.sort((a, b) => {
          if (a.status === "Resolved" && b.status !== "Resolved") return 1;
          if (a.status !== "Resolved" && b.status === "Resolved") return -1;
          return 0;
        });
        setReports(sorted);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <CircularProgress color="warning" />
        <Typography sx={{ mt: 2, color: "gray" }}>Loading feed...</Typography>
      </Container>
    );
  }

  if (!reports.length) {
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <Typography color="gray">No reports found.</Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#0D0D0D",
        color: "white",
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Typography
          variant="h4"
          sx={{
            color: "yellow",
            fontWeight: "bold",
            mb: 4,
            textAlign: "center",
          }}
        >
          Community Feed
        </Typography>

        <Stack spacing={3}>
          {reports.map((report) => (
            <Paper
              key={report.id}
              elevation={4}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: "16px",
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "flex-start",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 8px 25px rgba(255,255,0,0.2)",
                },
              }}
            >
              {/* Left side: Title + Chips + Date */}
              <Box sx={{ flex: { xs: "unset", md: 1 }, mb: { xs: 2, md: 0 }, pr: { md: 3 } }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "yellow", mb: 1 }}
                >
                  {report.title}
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
                  <Chip
                    label={`Category: ${formatLabel(report.category)}`}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.1)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.2)",
                      fontSize: "0.75rem",
                    }}
                  />
                  <Chip
                    label={`Status: ${formatLabel(report.status)}`}
                    sx={{
                      bgcolor:
                        report.status === "Pending"
                          ? "rgba(255,255,0,0.2)"
                          : report.status === "Resolved"
                          ? "rgba(0,255,0,0.2)"
                          : "rgba(255,255,255,0.1)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.2)",
                      fontSize: "0.75rem",
                    }}
                  />
                  <Chip
                    label={`Priority: ${formatLabel(report.priority)}`}
                    sx={{
                      bgcolor:
                        report.priority === "HIGH"
                          ? "rgba(255,0,0,0.2)"
                          : report.priority === "MEDIUM"
                          ? "rgba(255,165,0,0.2)"
                          : "rgba(0,255,0,0.2)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.2)",
                      fontSize: "0.75rem",
                    }}
                  />
                </Stack>

                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Reported on:{" "}
                  {new Date(report.dateCreated).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Typography>
              </Box>

              {/* Right side: Description + View Button */}
              <Box
                sx={{
                  flex: { xs: "unset", md: 2 },
                  mt: { xs: 2, md: 0 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "gray",
                    mb: 2,
                    lineHeight: 1.6,
                  }}
                >
                  {report.description || "No description provided."}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "black",
                    color: "yellow",
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: "bold",
                    py: 1,
                    "&:hover": { bgcolor: "rgba(255,255,0,0.1)" },
                  }}
                  onClick={() => navigate(`/report/${report.id}`)}
                >
                  View Details
                </Button>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Container>

      {/* Sticky Footer */}
      <Footer />
    </Box>
  );
}
