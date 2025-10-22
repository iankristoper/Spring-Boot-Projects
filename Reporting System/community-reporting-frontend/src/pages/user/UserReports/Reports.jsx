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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, 
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
import EditReportForm from "../../../components/EditReport";



export default function Reports() {

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);


  const [editOpen, setEditOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [open, setOpen] = useState(false);
  const [expandedIds, setExpandedIds] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));



  
  // Function to open edit modal
  const handleEdit = (report) => {
    setSelectedReport(report);
    setEditOpen(true);
  };


  const handleUpdate = (updatedData) => {
    axios
      .put(`http://localhost:8080/api/reports/update/${updatedData.id}`, updatedData, {
        withCredentials: true,
      })
      .then(() => {
        // ✅ Instantly update the local list (fast UI response)
        setReports((prev) =>
          prev.map((r) => (r.id === updatedData.id ? { ...r, ...updatedData } : r))
        );

        // ✅ Then refresh in the background (keep backend and frontend in sync)
        fetchReports();

        setEditOpen(false);
      })
      .catch((err) => console.error("Update failed:", err));
  };



  const [loading, setLoading] = useState(false);

  // ✅ Fetch reports (with loading indicator)
  const fetchReports = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/reports/fetch", { withCredentials: true })
      .then((res) => {
        setReports(res.data);
      })
      .catch((err) => {
        console.error("Error fetching reports:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReports(); // initial load

    // 🔁 Auto-refresh every 5 seconds
    const interval = setInterval(() => {
      fetchReports();
    }, 500);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);




  const handleSubmit = (data) => {
    axios
      .post("http://localhost:8080/api/reports/create", data, {
        withCredentials: true,
      })
      .then((res) => {
        // ✅ Add new item instantly to local list
        setReports((prev) => [res.data, ...prev]);

        // ✅ Refresh background to ensure perfect sync
        fetchReports();

        setOpen(false);
      })
      .catch((err) => console.error("Error creating report:", err));
  };


  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/reports/delete/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        // ✅ Instantly remove from UI
        setReports((prevReports) => prevReports.filter((r) => r.id !== id));

        // ✅ Then re-fetch quietly to ensure backend confirmation
        fetchReports();
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

  const confirmDelete = (id) => {
    setReportToDelete(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (reportToDelete) {
      handleDelete(reportToDelete);
      setConfirmDialogOpen(false);
      setReportToDelete(null);
    }
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
            reports
              .slice() // make a shallow copy to avoid mutating state
              .sort((a, b) => {
                if (a.status === "Resolved" && b.status !== "Resolved") return 1;
                if (a.status !== "Resolved" && b.status === "Resolved") return -1;
                return 0;
              }).map((report, index) => {
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
                        sx={{
                          color: "yellow",
                          maxWidth: "220px", // control title width to prevent overflow beside the arrow
                          whiteSpace: "normal", // allow line wrapping
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2, // limit to 2 lines max (adjust as you like)
                          overflow: "hidden", // hide excess text
                          textOverflow: "ellipsis", // show "..." if too long
                        }}
                      >
                        {report.title || "Untitled Report"}
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

                        {report.status === "Resolved" ? (
                          // 🟢 Show only Delete for resolved
                          <IconButton
                            size="small"
                            sx={{
                              color: "#ff5252",
                              bgcolor: "rgba(255,255,255,0.08)",
                              "&:hover": { bgcolor: "rgba(255,82,82,0.2)" },
                            }}
                            onClick={() => confirmDelete(report.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                          ) : (
                          // 🟡 Show Edit + Delete for others
                          <>
                            <IconButton
                              size="small"
                              sx={{
                                color: "yellow",
                                bgcolor: "rgba(255,255,255,0.08)",
                                "&:hover": { bgcolor: "rgba(255,255,0,0.2)" },
                              }}
                              onClick={() => handleEdit(report)}
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
                              onClick={() => confirmDelete(report.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </>
                        )}                  
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
                reports
                  .slice() // make a shallow copy to avoid mutating state
                  .sort((a, b) => {
                    if (a.status === "Resolved" && b.status !== "Resolved") return 1;
                    if (a.status !== "Resolved" && b.status === "Resolved") return -1;
                    return 0;
                  }).map((report) => (
                  <TableRow key={report.id}>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        maxWidth: "250px", // limit width to keep table layout clean
                        whiteSpace: "normal", // allow wrapping
                        wordWrap: "break-word", // break long words if needed
                        overflowWrap: "break-word",
                      }}
                    >
                      {report.title || "Untitled Report"}
                    </TableCell>

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
                    {report.status === "Resolved" ? (
                      // 🟢 Only show Delete button when resolved
                      <IconButton color="error" onClick={() => confirmDelete(report.id)}>
                        <DeleteIcon />
                      </IconButton>
                    ) : (
                      // 🟡 Show Edit + Delete for others
                      <>
                        <IconButton color="primary" onClick={() => handleEdit(report)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => confirmDelete(report.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}

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

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "black",
            color: "white",
            borderRadius: "16px",
       
          },
        }}
      >
        <DialogTitle
          sx={{ color: "red", fontWeight: "bold", textAlign: "center" }}
        >
          Confirm Deletion
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center", pb: 0 }}>
          <Typography sx={{ color: "#f0f0f0" }}>
            Are you sure you want to delete this report? This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2, gap: 2 }}>
          <Button
            onClick={() => setConfirmDialogOpen(false)}
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: "bold",
              backgroundColor: "#333",
              color: "white",
              "&:hover": { backgroundColor: "#555" },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 4,
              fontWeight: "bold",
              backgroundColor: "#FFFF00",
              color: "#000",
              
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>


      <EditReportForm
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        handleUpdate={handleUpdate}
        reportData={selectedReport}
      />

    </Container>
  );
}
