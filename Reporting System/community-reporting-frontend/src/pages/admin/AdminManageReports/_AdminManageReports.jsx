import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Box, Container, useMediaQuery, useTheme, Snackbar, Alert } from "@mui/material";
import ReportsTable from "./_ReportsTable";
import ReportsListMobile from "./_ReportsListMobile";
import ConfirmationDialog from "./_ConfirmationDialog";
import SnackbarAlert from "../../common/SnackbarAlert";
import { getPriorityColor, getStatusColor } from "../../utils/colorHelpers";

export default function AdminManageReports() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [confirmDialog, setConfirmDialog] = useState({ open: false, reportId: null, type: null });
  const [alert, setAlert] = useState({ open: false, message: "", severity: "info" });

  const previousIdsRef = useRef([]);

  // Fetch reports
  useEffect(() => {
    const fetchReports = () => {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/reports/fetch_all`, { withCredentials: true })
        .then((res) => {
          const sorted = res.data.sort((a, b) => (a.status === "Resolved" ? 1 : -1));
          previousIdsRef.current = sorted.map((r) => r.id);
          setReports(sorted);
        })
        .catch(() => setAlert({ open: true, message: "Failed to fetch reports", severity: "error" }));
    };
    fetchReports();
    const interval = setInterval(fetchReports, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter logic
  const filteredReports = reports.filter((r) => {
    const matchSearch = r.title?.toLowerCase().includes(search.toLowerCase()) ||
                        r.description?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || r.status === filter;
    return matchSearch && matchFilter;
  });

  // Actions
  const handleConfirmAction = (id, type) => setConfirmDialog({ open: true, reportId: id, type });

  const handleActionConfirmed = () => {
    const { reportId, type } = confirmDialog;
    let url = "", method = "put";

    if (type === "resolve") url = `/api/admin/update/report-status/${reportId}`;
    if (type === "archive") url = `/api/admin/update/archive-status/${reportId}`;
    if (type === "delete") { url = `/api/admin/report/delete/${reportId}`; method = "delete"; }

    axios[method](`${import.meta.env.VITE_API_BASE_URL}${url}`, { withCredentials: true })
      .then(() => {
        setReports((prev) => prev.filter((r) => r.id !== reportId));
        setAlert({ open: true, message: `Report ${type}d successfully`, severity: "success" });
      })
      .catch(() => setAlert({ open: true, message: `Failed to ${type} report`, severity: "error" }))
      .finally(() => setConfirmDialog({ open: false, reportId: null, type: null }));
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {isMobile ? (
          <ReportsListMobile
            reports={filteredReports}
            search={search}
            filter={filter}
            setSearch={setSearch}
            setFilter={setFilter}
            onAction={handleConfirmAction}
          />
        ) : (
          <ReportsTable
            reports={filteredReports}
            search={search}
            filter={filter}
            setSearch={setSearch}
            setFilter={setFilter}
            onAction={handleConfirmAction}
          />
        )}
      </Container>

      <ConfirmationDialog
        open={confirmDialog.open}
        type={confirmDialog.type}
        onConfirm={handleActionConfirmed}
        onClose={() => setConfirmDialog({ open: false, reportId: null, type: null })}
      />

      <SnackbarAlert alert={alert} setAlert={setAlert} />
    </Box>
  );
}
