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
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../ArchivePage/ArchiveHeader";
import FiltersBar from "../FiltersBar";
import ReportsTable from "../ArchivePage/ArchiveTable";
import ReportsMobileList from "../ArchivePage/ArchiveMobile";
import PaginationBar from "../PaginationBar";
import FooterBar from "../FooterBar";
import ConfirmDeleteDialog from "../../dialogs/ConfirmDeleteDialog";
import useReportsFetch from "../../hooks/useReportsFetch";
import getPriorityColor from "../../util/getPriorityColor";
import axios from "axios";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Archives() {
  const { reports, setReports } = useReportsFetch();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedReports, setSelectedReports] = useState([]);
  const [bulkActionMessage, setBulkActionMessage] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, reportIds: [], password: "" });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // ✅ Filter only archived
  const archivedReports = reports.filter((r) => r.archive === 1);

  // ✅ Search and filter
  const filteredReports = archivedReports.filter((r) => {
    const matchesSearch =
      r.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.description?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || r.status === filter;
    return matchesSearch && matchesFilter;
  });

  // ✅ Pagination
  const paginatedReports = filteredReports.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // ✅ Auto Refresh every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://localhost:8080/api/reports/fetch_all")
        .then((res) => setReports(res.data))
        .catch((err) => console.error("Auto-refresh failed:", err));
    }, 15000);

    return () => clearInterval(interval);
  }, [setReports]);

  // ✅ Restore handler
  const handleRestore = (id) => {
    axios
      .put(`http://localhost:8080/api/reports/restore/${id}`)
      .then(() => {
        setReports((prev) => prev.filter((r) => r.id !== id));
        setBulkActionMessage("Report successfully restored!");
      })
      .catch((err) => console.error("Failed to restore report:", err));
  };

  // ✅ Bulk restore
  const handleBulkRestore = () => {
    if (selectedReports.length === 0) return;
    selectedReports.forEach((id) => handleRestore(id));
    setBulkActionMessage(`${selectedReports.length} report(s) restored.`);
    setSelectedReports([]);
  };

  // ✅ Bulk delete
  const handleBulkDelete = () => {
    if (selectedReports.length === 0) return;
    setDeleteDialog({ open: true, reportIds: [...selectedReports], password: "" });
    setBulkActionMessage(`${selectedReports.length} report(s) selected for delete.`);
    setSelectedReports([]);
  };

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
            }}
          >
            Archived Reports
          </Typography>
          <Typography variant="body2" sx={{ color: "#bdbdbd" }}>
            Total: {filteredReports.length}
          </Typography>
        </Paper>

        {isMobile ? (
          <ReportsMobileList
            filteredReports={paginatedReports}
            getPriorityColor={getPriorityColor}
            handleViewDetails={(id) => navigate(`/admin/reports/${id}`)}
            handleRestore={handleRestore}
            openDeleteConfirm={(id) => setDeleteDialog({ open: true, reportIds: [id], password: "" })}
          />
        ) : (
          <ReportsTable
            reports={paginatedReports}
            handleViewDetails={(id) => navigate(`/admin/reports/${id}`)}
            handleRestore={handleRestore}
            openDeleteConfirm={(id) => setDeleteDialog({ open: true, reportIds: [id], password: "" })}
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
              position: "sticky",
              bottom: 0,
              bgcolor: "#000",
              borderTop: "1px solid rgba(255,255,0,0.2)",
              color: "yellow",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              py: 1.5,
              borderRadius: "0 0 12px 12px",
              boxShadow: "0 -2px 10px rgba(0,0,0,0.5)",
              zIndex: 10,
              width: "100%",
              mt: 1,
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {selectedReports.length} selected
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Tooltip title="Restore Selected">
                <IconButton sx={{ color: "lime" }} onClick={handleBulkRestore}>
                  <RestoreIcon />
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

      <ConfirmDeleteDialog
        deleteDialog={deleteDialog}
        setDeleteDialog={setDeleteDialog}
        setReports={setReports}
      />

      <Snackbar
        open={!!bulkActionMessage}
        autoHideDuration={4000}
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
