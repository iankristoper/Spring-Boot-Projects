// ✅ All same imports as before
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  useMediaQuery,
  Typography,
  IconButton,
  Tooltip,
  Paper, 
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../AdminManageReports/components/HeaderBar";
import FiltersBar from "../AdminManageReports/components/FiltersBar";
import ReportsTable from "../AdminManageReports/components/ReportsTable";
import ReportsMobileList from "../AdminManageReports/components/ReportsMobileList";
import PaginationBar from "../AdminManageReports/components/PaginationBar";
import FooterBar from "../AdminManageReports/components/FooterBar";

import ConfirmResolveDialog from "../AdminManageReports/dialogs/ConfirmResolveDialog";
import ConfirmDeleteDialog from "../AdminManageReports/dialogs/ConfirmDeleteDialog";
import ConfirmArchiveDialog from "../AdminManageReports/dialogs/ConfirmArchiveDialog";

import BulkResolveDialog from "../AdminManageReports/dialogs/BulkResolveDialog";
import BulkArchiveDialog from "../AdminManageReports/dialogs/BulkArchiveDialog";
import BulkDeleteDialog from "../AdminManageReports/dialogs/BulkDeleteDialog";

import AlertsGroup from "../AdminManageReports/components/AlertsGroup"; //  New modular alert import
import useReportsFetch from "../AdminManageReports/hooks/useReportsFetch";
import getPriorityColor from "../AdminManageReports/util/getPriorityColor";
import axios from "axios";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useResolveReport from "./hooks/useResolveReports";



export default function AdminManageReports() {
  const [bulkActionMessage, setBulkActionMessage] = useState("");

  const { reports, setReports, newReportAlert, setNewReportAlert } = useReportsFetch();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [expandedIds, setExpandedIds] = useState([]);
  const [resolveSuccessAlert, setResolveSuccessAlert] = useState(false);
  const [archiveSuccessAlert, setArchiveSuccessAlert] = useState(false);

  // ✅ Single-action dialogs
  const [confirmDialog, setConfirmDialog] = useState({ open: false, reportIds: [] });
  const [archiveDialog, setArchiveDialog] = useState({ open: false, reportIds: [] });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, reportIds: [], password: "" });

  // ✅ Bulk-action dialogs
  const [bulkResolveDialog, setBulkResolveDialog] = useState({ open: false, reportIds: [] });
  const [bulkArchiveDialog, setBulkArchiveDialog] = useState({ open: false, reportIds: [] });
  const [bulkDeleteDialog, setBulkDeleteDialog] = useState({ open: false, reportIds: [] });

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // Filtering
  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.description?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || r.status === filter;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    setPage(0);
  }, [search, filter]);

  // ✅ Auto Refresh every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://localhost:8080/api/reports/fetch_all")
        .then((res) => setReports(res.data))
        .catch((err) => console.error("Auto-refresh failed:", err));
    }, 15000); // refresh every 15s

    return () => clearInterval(interval);
  }, [setReports]);

  const { confirmResolve, loading, success, setSuccess } = useResolveReport({ setReports });


  React.useEffect(() => {
    if (success) {
      setResolveSuccessAlert(true);
      setSuccess(false); // reset flag
    }
  }, [success, setSuccess]);



  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Bulk selection
  const [selectedReports, setSelectedReports] = useState([]);

  const toggleSelectReport = (id) => {
    setSelectedReports((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const selectAllReports = (reports) => {
    if (selectedReports.length === reports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(reports.map((r) => r.id));
    }
  };

  const clearSelection = () => setSelectedReports([]);

  // ✅ Bulk action handlers with Snackbar
  const handleBulkResolve = () => {
    if (selectedReports.length === 0) return;
    setBulkResolveDialog({ open: true, reportIds: [...selectedReports] });
    setBulkActionMessage(`${selectedReports.length} report(s) selected for resolve.`);
    clearSelection();
  };

  const handleBulkArchive = () => {
    if (selectedReports.length === 0) return;
    setBulkArchiveDialog({ open: true, reportIds: [...selectedReports] });
    setBulkActionMessage(`${selectedReports.length} report(s) selected for archive.`);
    clearSelection();
  };

  const handleBulkDelete = () => {
    if (selectedReports.length === 0) return;
    setBulkDeleteDialog({ open: true, reportIds: [...selectedReports] });
    setBulkActionMessage(`${selectedReports.length} report(s) selected for delete.`);
    clearSelection();
  };


  // Pagination logic
  const paginatedReports = filteredReports.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // ✅ Close handlers for bulk dialogs
  const closeBulkResolveDialog = () => setBulkResolveDialog({ open: false, reportIds: [] });
  const closeBulkArchiveDialog = () => setBulkArchiveDialog({ open: false, reportIds: [] });
  const closeBulkDeleteDialog = () => setBulkDeleteDialog({ open: false, reportIds: [] });

  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: isMobile ? "#0d0d0d" : "background.default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 3, mb: 4, flex: 1 }}>
        <HeaderBar navigate={navigate} isMobile={isMobile} />
        <FiltersBar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />

        {/* ✅ Status Legend (Improved Layout) */}
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            p: 1.5,
            mt: 1.5,
            mb: 2,
            borderRadius: 2,
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#acacacff",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
              mr: 2,
            }}
          >
            Actions Legend:
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2.5,
              flexWrap: "wrap",
              color: "#bdbdbd",
            }}
          >
            {[
              { label: "View", color: "#36c6f6ff" },
              { label: "Verify", color: "#ff9800" },
              { label: "Resolve", color: "#4caf50" },
              { label: "Archive", color: "#fff239ff" },
              { label: "Delete", color: "#f44336" },
            ].map((item, index) => (
              <Box
                key={item.label}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  position: "relative",
                  "&:not(:last-child)::after": {
                    content: '""',
                    position: "absolute",
                    right: -12,
                    width: 1,
                    height: 16,
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <Box sx={{ width: 14, height: 14, bgcolor: item.color, borderRadius: "50%" }} />
                <Typography variant="body2" sx={{ color: "#d0d0d0" }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>


        {isMobile ? (
          <ReportsMobileList
            filteredReports={paginatedReports}
            getPriorityColor={getPriorityColor}
            handleViewDetails={(id) => navigate(`/admin/reports/${id}`)}
            handleVerifySoon={(id) => navigate(`/admin/reports/verify/${id}`)}
            openConfirmResolve={(id) => setConfirmDialog({ open: true, reportIds: [id] })}
            openArchiveConfirm={(id) => setArchiveDialog({ open: true, reportIds: [id] })}
            openDeleteConfirm={(id) => setDeleteDialog({ open: true, reportIds: [id], password: "" })}
          />
        ) : (
          <ReportsTable
            reports={paginatedReports}
            handleViewDetails={(id) => navigate(`/admin/reports/${id}`)}
            openDeleteConfirm={(id) => setDeleteDialog({ open: true, reportIds: [id], password: "" })}
            openConfirmResolve={(id) => setConfirmDialog({ open: true, reportIds: [id] })}
            openArchiveConfirm={(id) => setArchiveDialog({ open: true, reportIds: [id] })}
            handleVerifySoon={(id) => navigate(`/admin/reports/verify/${id}`)}
            getPriorityColor={getPriorityColor}
            selectedReports={selectedReports}
            toggleSelectReport={toggleSelectReport}
            selectAllReports={selectAllReports}
          />
        )}

        {/* ✅ Bulk Actions Bar (Fixed at bottom of screen) */}
{selectedReports.length > 0 && (
  <Box
    sx={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      bgcolor: "#000",
      borderTop: "1px solid rgba(255,255,0,0.2)",
      color: "yellow",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      px: 3,
      py: 1.5,
      zIndex: 1300, // keep it above everything
      boxShadow: "0 -2px 10px rgba(0,0,0,0.5)",
    }}
  >
    <Typography sx={{ fontWeight: "bold" }}>
      {selectedReports.length} selected
    </Typography>

    <Box sx={{ display: "flex", gap: 1 }}>
      <Tooltip title="Resolve Selected">
        <IconButton sx={{ color: "green" }} onClick={handleBulkResolve}>
          <CheckCircleIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Archive Selected">
        <IconButton sx={{ color: "#ffeb3b" }} onClick={handleBulkArchive}>
          <ArchiveIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete Selected">
        <IconButton sx={{ color: "red" }} onClick={handleBulkDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  </Box>
)}


        {!isMobile && (
          <PaginationBar
            filteredReports={filteredReports}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
            setPage={setPage}
          />
        )}
      </Container>


      {/* ✅ Dialogs */}

      <ConfirmResolveDialog
        confirmDialog={confirmDialog}
        closeConfirmDialog={() => setConfirmDialog({ open: false, reportIds: [] })}
        confirmResolve={() =>
          confirmResolve(confirmDialog.reportIds || [], () =>
            setConfirmDialog({ open: false, reportIds: [] })
          )
        }
      />


      <ConfirmDeleteDialog
        deleteDialog={deleteDialog}
        setDeleteDialog={setDeleteDialog}
        setReports={setReports}
      />

      <ConfirmArchiveDialog
        archiveDialog={archiveDialog}
        closeArchiveDialog={() => setArchiveDialog({ open: false, reportIds: [] })}
        setReports={setReports}
        setArchiveSuccessAlert={setArchiveSuccessAlert}
      />

      <BulkResolveDialog
        bulkResolveDialog={bulkResolveDialog}
        closeBulkResolveDialog={closeBulkResolveDialog}
        setReports={setReports}
        setResolveSuccessAlert={setResolveSuccessAlert}
      />

      <BulkArchiveDialog
        bulkArchiveDialog={bulkArchiveDialog}
        closeBulkArchiveDialog={closeBulkArchiveDialog}
        setReports={setReports}
        setArchiveSuccessAlert={setArchiveSuccessAlert}
      />

      <BulkDeleteDialog
        bulkDeleteDialog={bulkDeleteDialog}
        closeBulkDeleteDialog={closeBulkDeleteDialog}
        setReports={setReports}
      />

      {/* ✅ Modular Alerts */}
      <AlertsGroup
        newReportAlert={newReportAlert}
        setNewReportAlert={setNewReportAlert}
        resolveSuccessAlert={resolveSuccessAlert}
        setResolveSuccessAlert={setResolveSuccessAlert}
        archiveSuccessAlert={archiveSuccessAlert}
        setArchiveSuccessAlert={setArchiveSuccessAlert}
      />

      {/* ✅ Bulk Actions Snackbar */}
      <Snackbar
        open={!!bulkActionMessage}
        autoHideDuration={3000}
        onClose={() => setBulkActionMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setBulkActionMessage("")}
          severity="info"
          sx={{ width: "100%" }}
        >
          {bulkActionMessage}
        </MuiAlert>
      </Snackbar>


      <FooterBar />
    </Box>
  );
}
