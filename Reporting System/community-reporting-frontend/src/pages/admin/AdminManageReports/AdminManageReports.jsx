import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Snackbar, Alert, useMediaQuery } from "@mui/material";
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


export default function AdminManageReports() {
  const {
    reports,
    setReports,
    newReportAlert,
    setNewReportAlert,
    previousIdsRef
  } = useReportsFetch();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [expandedIds, setExpandedIds] = useState([]);
  const [resolveSuccessAlert, setResolveSuccessAlert] = useState(false);
  const [archiveSuccessAlert, setArchiveSuccessAlert] = useState(false);

  const [deleteDialog, setDeleteDialog] = useState({ open: false, reportId: null, password: "" });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, reportId: null });
  const [archiveDialog, setArchiveDialog] = useState({ open: false, reportId: null });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.description?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || r.status === filter;
    return matchesSearch && matchesFilter;
  });

  const paginatedReports = filteredReports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: isMobile ? "#0d0d0d" : "background.default", display: "flex", flexDirection: "column" }}>
      <Container maxWidth="lg" sx={{ mt: 3, mb: 4, flex: 1 }}>
        <HeaderBar navigate={navigate} isMobile={isMobile} />
        <FiltersBar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />

        {isMobile ? (
          <ReportsMobileList
            reports={filteredReports}
            expandedIds={expandedIds}
            toggleExpand={(id) =>
              setExpandedIds((prev) =>
                prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
              )
            }
            handleViewDetails={(id) => navigate(`/admin/reports/${id}`)}
            openDeleteConfirm={(id) => setDeleteDialog({ open: true, reportId: id, password: "" })}
            openConfirmResolve={(id) => setConfirmDialog({ open: true, reportId: id })}
            openArchiveConfirm={(id) => setArchiveDialog({ open: true, reportId: id })}
            handleVerifySoon={(id) => navigate(`/admin/reports/verify/${id}`)}
            getPriorityColor={getPriorityColor}
          />
        ) : (
          <ReportsTable
            reports={paginatedReports}
            handleViewDetails={(id) => navigate(`/admin/reports/${id}`)}
            openDeleteConfirm={(id) => setDeleteDialog({ open: true, reportId: id, password: "" })}
            openConfirmResolve={(id) => setConfirmDialog({ open: true, reportId: id })}
            openArchiveConfirm={(id) => setArchiveDialog({ open: true, reportId: id })}
            handleVerifySoon={(id) => navigate(`/admin/reports/verify/${id}`)}
            getPriorityColor={getPriorityColor}
          />
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

      {/* Dialogs */}
      <ConfirmResolveDialog
        confirmDialog={confirmDialog}
        closeConfirmDialog={() => setConfirmDialog({ open: false, reportId: null })}
        setReports={setReports}
        setResolveSuccessAlert={setResolveSuccessAlert}
      />
      <ConfirmDeleteDialog
        deleteDialog={deleteDialog}
        closeDeleteDialog={() => setDeleteDialog({ open: false, reportId: null, password: "" })}
        setReports={setReports}
      />
      <ConfirmArchiveDialog
        archiveDialog={archiveDialog}
        closeArchiveDialog={() => setArchiveDialog({ open: false, reportId: null })}
        setReports={setReports}
        setArchiveSuccessAlert={setArchiveSuccessAlert}
      />

      {/* Alerts */}
      <Snackbar open={newReportAlert} autoHideDuration={3000} onClose={() => setNewReportAlert(false)}>
        <Alert severity="info">New report added!</Alert>
      </Snackbar>

      <Snackbar open={resolveSuccessAlert} autoHideDuration={3000} onClose={() => setResolveSuccessAlert(false)}>
        <Alert severity="success">Report marked as resolved!</Alert>
      </Snackbar>

      <Snackbar open={archiveSuccessAlert} autoHideDuration={3000} onClose={() => setArchiveSuccessAlert(false)}>
        <Alert severity="info">Report archived successfully!</Alert>
      </Snackbar>

      <FooterBar />
    </Box>
  );
}
