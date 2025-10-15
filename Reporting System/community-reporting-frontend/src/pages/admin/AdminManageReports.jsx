import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Tooltip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  Collapse,
  Snackbar,
  Alert,
  TablePagination,
  Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import ArchiveIcon from "@mui/icons-material/Archive";




export default function AdminManageReports() {

  const [archiveDialog, setArchiveDialog] = useState({ open: false, reportId: null });
const [archiveSuccessAlert, setArchiveSuccessAlert] = useState(false);


  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [expandedIds, setExpandedIds] = useState([]);
  const [newReportAlert, setNewReportAlert] = useState(false);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const previousIdsRef = useRef([]);

  const [resolveSuccessAlert, setResolveSuccessAlert] = useState(false);

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    reportId: null,
    password: "",
  });


  const openDeleteConfirm = (id) => {
    setDeleteDialog({ open: true, reportId: id, password: "" });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, reportId: null, password: "" });
  };






  // New state for confirmation dialog
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    reportId: null,
  });

  // Open confirmation dialog
  const openConfirmResolve = (id) => {
    setConfirmDialog({ open: true, reportId: id });
  };

  // Close dialog
  const closeConfirmDialog = () => {
    setConfirmDialog({ open: false, reportId: null });
  };

  // Confirm and call API
  const confirmResolve = () => {
    const id = confirmDialog.reportId;
    axios.put(
      `http://localhost:8080/api/admin/update/report-status/${id}`,
      { status: "Resolved" },
      { withCredentials: true }  // 🔥 Important
    )
    .then((res) => {
      console.log("Response:", res.data);
      setReports((prevReports) =>
        prevReports.map((r) => (r.id === id ? { ...r, status: "Resolved" } : r))
      );
      closeConfirmDialog();
      setResolveSuccessAlert(true); // ✅ Show success Snackbar
    })
    .catch((err) => {
      console.error("Failed to resolve report", err);
      closeConfirmDialog();
    });
  };






  const openArchiveConfirm = (id) => {
  setArchiveDialog({ open: true, reportId: id });
};

const closeArchiveDialog = () => {
  setArchiveDialog({ open: false, reportId: null });
};

const confirmArchive = () => {
  const id = archiveDialog.reportId;
  axios
    .put(
      `http://localhost:8080/api/admin/update/archive-status/${id}`,
      {},
      { withCredentials: true }
    )
    .then(() => {
      setReports((prevReports) =>
        prevReports.map((r) =>
          r.id === id ? { ...r, status: "Archived" } : r
        )
      );
      closeArchiveDialog();
      setArchiveSuccessAlert(true);
    })
    .catch((err) => {
      console.error("Failed to archive report", err);
      closeArchiveDialog();
    });
};


  useEffect(() => {
    const fetchReports = () => {
      axios
        .get("http://localhost:8080/api/reports/fetch_all", { withCredentials: true })
        .then((res) => {
          const sortedReports = res.data.slice().sort((a, b) => {
            if (a.status === "Resolved" && b.status !== "Resolved") return 1;
            if (a.status !== "Resolved" && b.status === "Resolved") return -1;
            return 0;
          });

          const newIds = sortedReports.map((r) => r.id);

          if (previousIdsRef.current.length > 0 && newIds.some((id) => !previousIdsRef.current.includes(id))) {
            setNewReportAlert(true);
          }

          previousIdsRef.current = newIds;
          setReports(sortedReports);
        })
        .catch((err) => console.error("Failed to fetch reports", err));
    };

    fetchReports();
    const interval = setInterval(fetchReports, 5000);
    return () => clearInterval(interval);
  }, []);




  const handleViewDetails = (id) => {
    // Navigate to a new page that will show this report's full details
    navigate(`/admin/reports/${id}`);
  };





  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      axios
        .delete(`http://localhost:8080/api/reports/delete/${id}`)
        .then(() => setReports(reports.filter((r) => r.id !== id)))
        .catch((err) => console.error("Failed to delete report", err));
    }
  };




  const confirmDelete = () => {
    const { reportId, password } = deleteDialog;

    axios
      .delete(`http://localhost:8080/api/admin/report/delete/${reportId}`, {
        data: { password },          // send password in request body
        withCredentials: true,       // ensure cookies/session are included
      })
      .then((res) => {
        console.log(res.data);
        setReports((prevReports) =>
          prevReports.filter((r) => r.id !== reportId)
        );
        closeDeleteDialog();
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          alert("Incorrect password. Please try again.");
        } else {
          console.error("Failed to delete report", err);
        }
      });
  };




  const handleVerify = (id) => {
    axios
      .put(`http://localhost:8080/api/reports/verify/${id}`)
      .then(() =>
        setReports(reports.map((r) => (r.id === id ? { ...r, status: "Verified" } : r)))
      )
      .catch((err) => console.error("Failed to verify report", err));
  };



  const handleVerifySoon = (id) => {
    navigate(`/admin/reports/verify/${id}`);
  };
  



  const handleResolve = (id) => {
    axios
      .put(`http://localhost:8080/api/reports/resolve/${id}`)
      .then(() =>
        setReports(reports.map((r) => (r.id === id ? { ...r, status: "Resolved" } : r)))
      )
      .catch((err) => console.error("Failed to resolve report", err));
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.description?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || r.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Slice for pagination
  const paginatedReports = filteredReports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Priority colors
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "CRITICAL":
        return "#ff2525ff"; // red
      case "HIGH":
        return "#ffac30ff"; // orange
      case "MEDIUM":
        return "#f9ff50ff"; // yellow
      case "LOW":
        return "#19a763ff"; // green
      default:
        return "gray";
    }
  };

  //This is for keep Pagination After Filtering
    useEffect(() => {
    setPage(0);
  }, [search, filter]);




  return (
    <Box sx={{ minHeight: "100vh", bgcolor: isMobile ? "#0d0d0d" : "background.default", display: "flex", flexDirection: "column" }}>
      <Container maxWidth="lg" sx={{ mt: 3, mb: 4, flex: 1 }}>
        {/* Header */}
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: "16px", bgcolor: "black", color: "white", position: "relative" }}>
          {isMobile && (
            <IconButton
              onClick={() => navigate("/admin/admin-home")}
              sx={{ position: "absolute", top: 12, left: 12, color: "yellow", bgcolor: "black", border: "1px solid yellow", "&:hover": { bgcolor: "#222" } }}
              size="small"
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
          )}
          <Box display="flex" alignItems="center" justifyContent={isMobile ? "center" : "space-between"} flexWrap="wrap" gap={1}>
            {!isMobile && (
              <Button
                startIcon={<ArrowBackIcon />}
                variant="outlined"
                size="medium"
                sx={{ color: "yellow", borderColor: "yellow", "&:hover": { borderColor: "white", color: "white" } }}
                onClick={() => navigate("/admin/admin-home")}
              >
                Back
              </Button>
            )}
            <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold" sx={{ color: "yellow", textAlign: isMobile ? "center" : "right", width: isMobile ? "100%" : "auto", letterSpacing: "0.5px" }}>
              Manage Reports
            </Typography>
          </Box>
        </Paper>

        {/* Filters */}
        <Paper elevation={2} sx={{ p: 2, borderRadius: "12px", display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", justifyContent: "space-between" }}>
          <TextField label="Search Reports" variant="outlined" size="small" value={search} onChange={(e) => setSearch(e.target.value)} sx={{ flex: 1, minWidth: 220 }} />
          <TextField label="Filter by Status" select variant="outlined" size="small" value={filter} onChange={(e) => setFilter(e.target.value)} sx={{ width: 200 }}>
            {["All", "Pending", "Verified", "Resolved"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Paper>

        {/* Mobile Collapsible Cards */}
        {isMobile ? (
          <div className="row mt-3">
            {filteredReports.length > 0 ? (
              filteredReports.map((r) => {
                const isExpanded = expandedIds.includes(r.id);
                return (
                  <div className="col-12 mb-3" key={r.id}>
                    <Paper elevation={4} sx={{ p: 2, width: "100%", borderRadius: "12px", bgcolor: "#1a1a1a", color: "white" }}> {/**border: "1px solid rgba(255,255,0,0.3)" */}
                      <Box display="flex" justifyContent="space-between" alignItems="center" onClick={() => toggleExpand(r.id)}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "white" }}>
                            {r.title || "Untitled Report"}
                          </Typography>
                          <Typography variant="body2" sx={{ color: getPriorityColor(r.priority), fontWeight: "bold" }}>
                            {r.priority
                              ? r.priority.charAt(0).toUpperCase() + r.priority.slice(1).toLowerCase()
                              : "Low"}
                          </Typography>

                          <Typography variant="body2" sx={{ color: r.status === "Resolved" ? "#00e676" : r.status === "Verified" ? "#ffb74d" : "#ef5350" }}>
                            {r.status || "Pending"}
                          </Typography>
                        </Box>

                        <IconButton sx={{ color: "yellow" }} size="small" onClick={(e) => { e.stopPropagation(); toggleExpand(r.id); }}>
                          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </Box>

                      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <Divider sx={{ my: 1 }} />
                        
                        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 1.5, flexWrap: "wrap" }}>
                          <Tooltip title="View Details">
                            <IconButton color="primary" onClick={() => handleViewDetails(r.id)}>
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Verify"><IconButton onClick={() => handleVerifySoon(r.id)} sx={{ color: "#ffb74d" }}><VerifiedIcon /></IconButton></Tooltip>
                          <Tooltip title="Resolve">
                            <IconButton
                              onClick={() => openConfirmResolve(r.id)}
                              sx={{ color: "green" }}
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Archive">
  <IconButton onClick={() => openArchiveConfirm(r.id)} sx={{ color: "#ffeb3b" }}>
    <ArchiveIcon />
  </IconButton>
</Tooltip>

                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => openDeleteConfirm(r.id)}
                              sx={{ color: "red" }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Collapse>
                    </Paper>
                  </div>
                );
              })
            ) : (
              <div className="col-12">
                <Paper sx={{ p: 4, textAlign: "center", borderRadius: "12px", color: "gray", bgcolor: "#1a1a1a" }}>
                  <Typography>No reports found.</Typography>
                </Paper>
              </div>
            )}
          </div>
        ) : (
          // Desktop Table View with Pagination
          <TableContainer component={Paper} elevation={3} sx={{ mt: 3, borderRadius: "12px" }}>
            <Table>
              <TableHead sx={{ bgcolor: "black" }}>
                <TableRow>
                  <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>Title</TableCell>
                  
                  <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>Priority</TableCell>
                  <TableCell align="center" sx={{ color: "yellow", fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedReports.length > 0 ? (
                  paginatedReports.map((r) => (
                    <TableRow key={r.id} sx={{ "&:hover": { bgcolor: "rgba(255,255,0,0.05)" } }}>
                      <TableCell>{r.title}</TableCell>
                     
                      <TableCell>
                        <Typography sx={{ color: r.status === "Resolved" ? "#00e676" : r.status === "Verified" ? "orange" : "red" }}> {/**fontWeight: "Bold" */}
                          {r.status || "Pending"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                      <Typography sx={{ color: getPriorityColor(r.priority),  }}> {/**fontWeight: "bold" */}
                        {r.priority
                          ? r.priority.charAt(0).toUpperCase() + r.priority.slice(1).toLowerCase()
                          : "Low"}
                      </Typography>

                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Details">
                          <IconButton color="primary" onClick={() => handleViewDetails(r.id)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Verify"><IconButton onClick={() => handleVerifySoon(r.id)} sx={{ color: "orange" }}><VerifiedIcon /></IconButton></Tooltip>
                        <Tooltip title="Resolve">
                          <IconButton
                            onClick={() => openConfirmResolve(r.id)}
                            sx={{ color: "green" }}
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Archive">
  <IconButton onClick={() => openArchiveConfirm(r.id)} sx={{ color: "#ffeb3b" }}>
    <ArchiveIcon />
  </IconButton>
</Tooltip>

                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => openDeleteConfirm(r.id)}
                            sx={{ color: "red" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ color: "gray" }}>No reports found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

           {/* Pagination */}
          {/* Custom Pagination Bar (perfectly aligned) */}
            <Box
              sx={{
                bgcolor: "black",
                color: "yellow",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                px: 3,
                py: 1,
                gap: 1.5,
                flexWrap: "nowrap",
              }}
            >
              <Typography variant="body2" sx={{ color: "yellow" }}>
                Rows per page:
              </Typography>

              <TextField
                select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
                variant="outlined"
                size="small"
                sx={{
                  width: 70,
                  "& .MuiSelect-select": {
                    color: "yellow",
                    py: "4px",
                  },
                  "& fieldset": {
                    borderColor: "yellow",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "& svg": {
                    color: "yellow",
                  },
                }}
              >
                {[5, 10, 25, 50].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <Typography variant="body2" sx={{ color: "yellow", mx: 2 }}>
                {`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, filteredReports.length)} of ${filteredReports.length}`}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  size="small"
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  sx={{ color: "yellow" }}
                >
                  {"<"}
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() =>
                    setPage(
                      Math.min(
                        Math.ceil(filteredReports.length / rowsPerPage) - 1,
                        page + 1
                      )
                    )
                  }
                  disabled={page >= Math.ceil(filteredReports.length / rowsPerPage) - 1}
                  sx={{ color: "yellow" }}
                >
                  {">"}
                </IconButton>
              </Box>
            </Box>

          </TableContainer>
        )}

      </Container>
      <Dialog
        open={confirmDialog.open}
        onClose={closeConfirmDialog}
        PaperProps={{
          sx: {
            bgcolor: "#0d0d0d", // dark background
            color: "white",
            //border: "1px solid rgba(255,255,0,0.4)",
            borderRadius: "12px",
            //boxShadow: "0 0 12px rgba(255,255,0,0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: "yellow",
            borderBottom: "1px solid rgba(255,255,0,0.2)",
          }}
        >
          Confirm Resolution
        </DialogTitle>

        <DialogContent sx={{ mt: 1 }}>
          <Typography sx={{ color: "white", fontSize: "0.95rem" }}>
            Are you sure you want to mark this report as{" "}
            <b style={{ color: "#00e676" }}>Resolved</b>?
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            borderTop: "1px solid rgba(255,255,0,0.2)",
            p: 2,
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={closeConfirmDialog}
            variant="outlined"
            sx={{
              color: "yellow",
              borderColor: "yellow",
              "&:hover": {
                borderColor: "red",
                color: "white",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={confirmResolve}
            variant="contained"
            sx={{
              bgcolor: "yellow",
              color: "black",
              //fontWeight: "bold",
              "&:hover": {
                bgcolor: "#58ff3bff",
                color: "black",
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialog.open}
        onClose={closeDeleteDialog}
        PaperProps={{
          sx: {
            bgcolor: "#0d0d0d",
            color: "white",
            //border: "1px solid rgba(255,0,0,0.4)",
            borderRadius: "12px",
            //boxShadow: "0 0 15px rgba(255,0,0,0.3)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: "red",
            borderBottom: "1px solid rgba(255,0,0,0.2)",
          }}
        >
          Confirm Delete
        </DialogTitle>

        <DialogContent sx={{ mt: 1 }}>
          <Typography sx={{ color: "white", mb: 2 }}>
            This action will permanently delete the report. Please enter your admin
            password to confirm.
          </Typography>
          <TextField
            type="password"
            label="Admin Password"
            variant="outlined"
            fullWidth
            size="small"
            value={deleteDialog.password}
            onChange={(e) =>
              setDeleteDialog({ ...deleteDialog, password: e.target.value })
            }
            sx={{
              input: { color: "white" },
              "& label": { color: "gray" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "red" },
                "&:hover fieldset": { borderColor: "white" },
              },
            }}
          />
        </DialogContent>

        <DialogActions
          sx={{
            borderTop: "1px solid rgba(255,0,0,0.2)",
            p: 2,
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={closeDeleteDialog}
            variant="outlined"
            sx={{
              color: "red",
              borderColor: "red",
              "&:hover": { borderColor: "white", color: "white" },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={confirmDelete}
            variant="contained"
            sx={{
              bgcolor: "red",
              color: "white",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#ff4444" },
            }}
            disabled={!deleteDialog.password}
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
  open={archiveDialog.open}
  onClose={closeArchiveDialog}
  PaperProps={{
    sx: {
      bgcolor: "#0d0d0d",
      color: "white",
      border: "1px solid rgba(255,255,0,0.4)",
      borderRadius: "12px",
      boxShadow: "0 0 12px rgba(255,255,0,0.2)",
    },
  }}
>
  <DialogTitle
    sx={{
      fontWeight: "bold",
      color: "yellow",
      borderBottom: "1px solid rgba(255,255,0,0.2)",
    }}
  >
    Confirm Archive
  </DialogTitle>

  <DialogContent sx={{ mt: 1 }}>
    <Typography sx={{ color: "white", fontSize: "0.95rem" }}>
      Are you sure you want to <b style={{ color: "#ffeb3b" }}>archive</b> this
      report? It will be moved out of the active list.
    </Typography>
  </DialogContent>

  <DialogActions
    sx={{
      borderTop: "1px solid rgba(255,255,0,0.2)",
      p: 2,
      justifyContent: "flex-end",
    }}
  >
    <Button
      onClick={closeArchiveDialog}
      variant="outlined"
      sx={{
        color: "yellow",
        borderColor: "yellow",
        "&:hover": { borderColor: "white", color: "white" },
      }}
    >
      Cancel
    </Button>

    <Button
      onClick={confirmArchive}
      variant="contained"
      sx={{
        bgcolor: "yellow",
        color: "black",
        fontWeight: "bold",
        "&:hover": { bgcolor: "white", color: "black" },
      }}
    >
      Confirm
    </Button>
  </DialogActions>
</Dialog>






      <Snackbar open={newReportAlert} autoHideDuration={3000} onClose={() => setNewReportAlert(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="info" sx={{ width: "100%" }}>New report added!</Alert>
      </Snackbar>

      <Snackbar
        open={resolveSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setResolveSuccessAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Report marked as resolved!
        </Alert>
      </Snackbar>

      <Snackbar
  open={archiveSuccessAlert}
  autoHideDuration={3000}
  onClose={() => setArchiveSuccessAlert(false)}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert severity="info" sx={{ width: "100%" }}>
    Report archived successfully!
  </Alert>
</Snackbar>



      

      <Box component="footer" sx={{ flexShrink: 0, py: 2, textAlign: "center", color: "gray", fontSize: "0.8rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        © 2025 Community Reporting App — Admin Portal
      </Box>
    </Box>
  );
}
