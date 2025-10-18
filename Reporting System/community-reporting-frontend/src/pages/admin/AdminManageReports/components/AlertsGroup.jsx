import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function AlertsGroup({
  newReportAlert,
  setNewReportAlert,
  resolveSuccessAlert,
  setResolveSuccessAlert,
  archiveSuccessAlert,
  setArchiveSuccessAlert,
}) {
  return (
    <>
      {/* 🆕 New Report Alert */}
      <Snackbar
        open={newReportAlert}
        autoHideDuration={3000}
        onClose={() => setNewReportAlert(false)}
      >
        <Alert severity="info" variant="filled">
          New report added!
        </Alert>
      </Snackbar>

      {/* ✅ Resolve Success Alert */}
      <Snackbar
        open={resolveSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setResolveSuccessAlert(false)}
      >
        <Alert severity="success" variant="filled">
          Report(s) resolved successfully!
        </Alert>
      </Snackbar>

      {/* 📦 Archive Success Alert */}
      <Snackbar
        open={archiveSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setArchiveSuccessAlert(false)}
      >
        <Alert severity="info" variant="filled">
          Report(s) archived successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
