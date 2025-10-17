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
import useReportsFetch from "../AdminManageReports/hooks/useReportsFetch";
import getPriorityColor from "../AdminManageReports/util/getPriorityColor";
import axios from "axios";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminManageReports() {
  const {
    reports,
    setReports,
    newReportAlert,
    setNewReportAlert,
  } = useReportsFetch();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [expandedIds, setExpandedIds] = useState([]);
  const [resolveSuccessAlert, setResolveSuccessAlert] = useState(false);
  const [archiveSuccessAlert, setArchiveSuccessAlert] = useState(false);

  // Dialog states
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    reportId: null,
    password: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    reportId: null,
  });
  const [archiveDialog, setArchiveDialog] = useState({
    open: false,
    reportId: null,
  });

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

  // Reset pagination when filters/search change
  useEffect(() => {
    setPage(0);
  }, [search, filter]);

  // Mobile expand toggle
  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Bulk selection logic
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

  // Bulk action handlers
  const handleBulkResolve = () => {
    selectedReports.forEach((id) => {
      setConfirmDialog({ open: true, reportId: id });
    });
    clearSelection();
  };

  const handleBulkArchive = () => {
    selectedReports.forEach((id) => {
      setArchiveDialog({ open: true, reportId: id });
    });
    clearSelection();
  };

  const handleBulkDelete = () => {
    selectedReports.forEach((id) => {
      setDeleteDialog({ open: true, reportId: id, password: "" });
    });
    clearSelection();
  };

  // Pagination
  const paginatedReports = filteredReports.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
        {/* Header */}
        <HeaderBar navigate={navigate} isMobile={isMobile} />

        {/* Filters */}
        <FiltersBar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        {/* Table or Mobile List */}
        {isMobile ? (
          <ReportsMobileList
            filteredReports={paginatedReports}
            getPriorityColor={getPriorityColor}
            handleViewDetails={(id) => navigate(`/admin/reports/${id}`)}
            handleVerifySoon={(id) =>
              navigate(`/admin/reports/verify/${id}`)
            }
            openConfirmResolve={(id) =>
              setConfirmDialog({ open: true, reportId: id })
            }
            openArchiveConfirm={(id) =>
              setArchiveDialog({ open: true, reportId: id })
            }
            openDeleteConfirm={(id) =>
              setDeleteDialog({ open: true, reportId: id, password: "" })
            }
          />
        ) : (
          <ReportsTable
            reports={paginatedReports}
            handleViewDetails={(id) => navigate(`/admin/reports/${id}`)}
            openDeleteConfirm={(id) =>
              setDeleteDialog({ open: true, reportId: id, password: "" })
            }
            openConfirmResolve={(id) =>
              setConfirmDialog({ open: true, reportId: id })
            }
            openArchiveConfirm={(id) =>
              setArchiveDialog({ open: true, reportId: id })
            }
            handleVerifySoon={(id) =>
              navigate(`/admin/reports/verify/${id}`)
            }
            getPriorityColor={getPriorityColor}
            selectedReports={selectedReports}
            toggleSelectReport={toggleSelectReport}
            selectAllReports={selectAllReports}
          />
        )}

        {/* Bulk Actions Bar */}
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
                <IconButton
                  sx={{ color: "#ffeb3b" }}
                  onClick={handleBulkArchive}
                >
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

        {/* Pagination */}
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

      {/* Dialogs */}
      <ConfirmResolveDialog
        confirmDialog={confirmDialog}
        closeConfirmDialog={() =>
          setConfirmDialog({ open: false, reportId: null })
        }
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
        closeArchiveDialog={() =>
          setArchiveDialog({ open: false, reportId: null })
        }
        setReports={setReports}
        setArchiveSuccessAlert={setArchiveSuccessAlert}
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
        <Alert severity="success">Report marked as resolved!</Alert>
      </Snackbar>

      <Snackbar
        open={archiveSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setArchiveSuccessAlert(false)}
      >
        <Alert severity="info">Report archived successfully!</Alert>
      </Snackbar>

      {/* Footer */}
      <FooterBar />
    </Box>
  );
}
