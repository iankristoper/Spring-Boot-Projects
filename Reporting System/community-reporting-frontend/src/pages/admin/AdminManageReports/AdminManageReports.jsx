// ✅ All same imports as before
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Snackbar,
  Alert,
  useMediaQuery,
  Typography,
  IconButton,
  Tooltip,
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

import useReportsFetch from "../AdminManageReports/hooks/useReportsFetch";
import getPriorityColor from "../AdminManageReports/util/getPriorityColor";
import axios from "axios";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminManageReports() {
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

  // ✅ Bulk action handlers
  const handleBulkResolve = () => {
    if (selectedReports.length === 0) return;
    setBulkResolveDialog({ open: true, reportIds: [...selectedReports] });
    clearSelection();
  };

  const handleBulkArchive = () => {
    if (selectedReports.length === 0) return;
    setBulkArchiveDialog({ open: true, reportIds: [...selectedReports] });
    clearSelection();
  };

  const handleBulkDelete = () => {
    if (selectedReports.length === 0) return;
    setBulkDeleteDialog({ open: true, reportIds: [...selectedReports] });
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

        {/* ✅ Bulk Actions Bar */}
        {selectedReports.length > 0 && (
          <Box
            sx={{
              bgcolor: "#000",
              borderTop: "1px solid rgba(255,255,0,0.2)",
              color: "yellow",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              py: 1.5,
              borderRadius: "0 0 12px 12px",
              mt: -1,
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

      {/* ✅ Single dialogs */}
      <ConfirmResolveDialog
        confirmDialog={confirmDialog}
        closeConfirmDialog={() => setConfirmDialog({ open: false, reportIds: [] })}
        setReports={setReports}
        setResolveSuccessAlert={setResolveSuccessAlert}
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

      {/* ✅ Bulk dialogs */}
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

      {/* Alerts */}
      <Snackbar
        open={newReportAlert}
        autoHideDuration={3000}
        onClose={() => setNewReportAlert(false)}
      >
        <Alert severity="info">New report added!</Alert>
      </Snackbar>

      <Snackbar
        open={resolveSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setResolveSuccessAlert(false)}
      >
        <Alert severity="success">Report(s) resolved successfully!</Alert>
      </Snackbar>

      <Snackbar
        open={archiveSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setArchiveSuccessAlert(false)}
      >
        <Alert severity="info">Report(s) archived successfully!</Alert>
      </Snackbar>

      <FooterBar />
    </Box>
  );
}
