import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  Collapse,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";
import ReportForm from "./ReportForm";
import { useTheme } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";




export default function Reports() {
  const [reports, setReports] = useState([]);
  const [open, setOpen] = useState(false);
  const [expandedIds, setExpandedIds] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    axios
      .get("http://localhost:8080/api/reports/fetch", { withCredentials: true })
      .then((res) => setReports(res.data))
      .catch((err) => console.error("Error fetching reports:", err));
  };

  const handleSubmit = (data) => {
    axios
      .post("http://localhost:8080/api/reports/create", data, {
        withCredentials: true,
      })
      .then((res) => {
        setReports((prev) => [res.data, ...prev]);
      })
      .catch((err) => console.error("Error creating report:", err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/reports/${id}`)
      .then(() => {
        setReports(reports.filter((r) => r.id !== id));
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id) // collapse if already expanded
        : [...prev, id] // expand if not yet expanded
    );
  };
    
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/reports/${id}`);
  };



  





  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: "16px",
          bgcolor: "black",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "yellow", mb: 2 }}
        >
          My Reports
        </Typography>
        <Typography variant="body1">
          Here you can view, edit, and delete your submitted reports.
        </Typography>
      </Paper>

      {/* New Report Button */}
      <Box sx={{ mt: 3, textAlign: "right" }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "black",
            color: "yellow",
            borderRadius: "12px",
            "&:hover": { bgcolor: "#222" },
          }}
          onClick={() => setOpen(true)}
        >
          New Report
        </Button>
      </Box>

      {/* Popup Form */}
      <ReportForm
        open={open}
        handleClose={() => setOpen(false)}
        handleSubmit={handleSubmit}
      />

      {/* 📱 Collapsible Mobile Card Layout */}
      {isMobile ? (
        <Stack spacing={2} sx={{ mt: 3 }}>
          {reports.length > 0 ? (
            reports.map((report, index) => {
              // ✅ Ensure each card has a unique ID or fallback key
              const reportKey = report.id || index;
              const isExpanded = expandedIds.includes(reportKey);
              return (
                <Card
                  key={reportKey}
                  elevation={3}
                  sx={{
                    borderRadius: "14px",
                    bgcolor: "black",
                    color: "white",
                    border: "1px solid rgba(255, 255, 0, 0.3)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
                  }}
                >
                  <CardContent
                    sx={{
                      p: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    onClick={() => toggleExpand(reportKey)}
                  >
                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ color: "yellow" }}
                      >
                        {report.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            report.status === "Resolved"
                              ? "#00e676"
                              : report.status === "Rejected"
                              ? "#ff5252"
                              : "orange",
                        }}
                      >
                        {report.status || "Pending"}
                      </Typography>
                    </Box>

                    {/* 🔽 Arrow button (independent toggle) */}
                    <IconButton
                      sx={{ color: "yellow" }}
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(reportKey);
                      }}
                    >
                      {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </CardContent>

                  {/* 🔽 Collapsible Section */}
                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <CardContent sx={{ p: 2, pt: 0 }}>
                      <Typography variant="body2" sx={{ color: "#f0f0f0" }}>
                        🏷️ <b>Category:</b> {report.category}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#f0f0f0" }}>
                        📅 <b>Date:</b>{" "}
                        {new Date(report.dateCreated).toLocaleDateString()}
                      </Typography>

                      <Box
                        sx={{
                          mt: 1.5,
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: 1,
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            color: "#00e5ff",
                            bgcolor: "rgba(255,255,255,0.08)",
                            "&:hover": { bgcolor: "rgba(0,229,255,0.2)" },
                          }}
                          onClick={() => handleView(report.id)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          size="small"
                          sx={{
                            color: "yellow",
                            bgcolor: "rgba(255,255,255,0.08)",
                            "&:hover": { bgcolor: "rgba(255,255,0,0.2)" },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{
                            color: "#ff5252",
                            bgcolor: "rgba(255,255,255,0.08)",
                            "&:hover": { bgcolor: "rgba(255,82,82,0.2)" },
                          }}
                          onClick={() => handleDelete(report.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        
                      </Box>
                    </CardContent>
                  </Collapse>
                </Card>
              );
            })
          ) : (
            <Typography align="center" sx={{ mt: 2, color: "text.secondary" }}>
              No reports found.
            </Typography>
          )}
        </Stack>
      ) : (
        // 💻 Desktop Table Layout
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: "black" }}>
              <TableRow>
                <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>
                  Title
                </TableCell>
                <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>
                  Category
                </TableCell>
                <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>
                  Date Created
                </TableCell>
                <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.title}</TableCell>
                    <TableCell>{report.category}</TableCell>
                    <TableCell>{report.status || "Pending"}</TableCell>
                    <TableCell>
                      {new Date(report.dateCreated).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="info"
                        onClick={() => handleView(report.id)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(report.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No reports found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
