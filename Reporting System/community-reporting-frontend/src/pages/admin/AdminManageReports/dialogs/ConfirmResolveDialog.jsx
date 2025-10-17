import React from "react";
import { Dialog, DialogTitle, DialogActions, Button, Typography } from "@mui/material";
import axios from "axios";

export default function ConfirmResolveDialog({ confirmDialog, closeConfirmDialog, setReports, setResolveSuccessAlert }) {
  const handleConfirmResolve = () => {
    axios
      .put(`http://localhost:8080/api/reports/resolve/${confirmDialog.reportId}`, {}, { withCredentials: true })
      .then(() => {
        setReports((prev) =>
          prev.map((r) => (r.id === confirmDialog.reportId ? { ...r, status: "Resolved" } : r))
        );
        setResolveSuccessAlert(true);
        closeConfirmDialog();
      })
      .catch((err) => console.error("Error resolving report", err));
  };

  return (
    <Dialog open={confirmDialog.open} onClose={closeConfirmDialog}>
      <DialogTitle>Confirm Resolve</DialogTitle>
      <Typography sx={{ p: 2 }}>
        Are you sure you want to mark this report as <b>Resolved</b>?
      </Typography>
      <DialogActions>
        <Button onClick={closeConfirmDialog}>Cancel</Button>
        <Button variant="contained" color="success" onClick={handleConfirmResolve}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
