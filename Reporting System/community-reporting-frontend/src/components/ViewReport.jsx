import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";



export default function ViewReport() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch single report later
  axios.get(`http://localhost:8080/api/reports/fetch/${id}`, {
    withCredentials: true, // ✅ this sends your JSESSIONID cookie
  })
  .then(res => setReport(res.data))
  .catch(err => console.error("Error fetching report:", err))
  .finally(() => setLoading(false));



    /* Placeholder for now
    setTimeout(() => {
      setReport({
        id,
        title: "Report Title",
        description: "This is a placeholder description for report details.",
        category: "Environment",
        status: "Pending",
        dateCreated: new Date().toISOString(),
      });
      setLoading(false);
    }, 500);*/
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <CircularProgress color="warning" />
        <Typography sx={{ mt: 2, color: "text.secondary" }}>
          Getting report...
        </Typography>
      </Container>
    );
  }

  if (!report) {
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <Typography color="error">Report not found.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: "16px",
          bgcolor: "black",
          color: "white",
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{
            color: "yellow",
            mb: 2,
            "&:hover": { bgcolor: "rgba(255,255,0,0.1)" },
          }}
          href="/reports"
        >
          Back to Reports
        </Button>

        <Typography variant="h4" fontWeight="bold" sx={{ color: "yellow" }}>
          {report.title}
        </Typography>
        <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.2)" }} />

        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>Category:</b> {report.category}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>Status:</b> {report.status}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>Date Created:</b> {" "}
          {new Date(report.dateCreated).toLocaleDateString()}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            p: 2,
            bgcolor: "rgba(255,255,255,0.05)",
            borderRadius: "10px",
            whiteSpace: "pre-wrap",
          }}
        >
          {report.description}
        </Typography>
      </Paper>
    </Container>
  );
}
