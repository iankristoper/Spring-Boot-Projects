import React from "react";
import { Dialog, DialogTitle, DialogActions, Button, Typography } from "@mui/material";
import axios from "axios";

export default function ConfirmArchiveDialog({ archiveDialog, closeArchiveDialog, setReports, setArchiveSuccessAlert }) {
  const handleConfirmArchive = () => {
    axios
      .put(`http://localhost:8080/api/reports/archive/${archiveDialog.reportId}`, {}, { withCredentials: true })
      .then(() => {
        setReports((prev) => prev.filter((r) => r.id !== archiveDialog.reportId));
        setArchiveSuccessAlert(true);
        closeArchiveDialog();
      })
      .catch((err) => console.error("Error archiving report", err));
  };

  return (
    <Dialog open={archiveDialog.open} onClose={closeArchiveDialog}>
      <DialogTitle>Confirm Archive</DialogTitle>
      <Typography sx={{ p: 2 }}>
        Are you sure you want to move this report to <b>Archived</b>?
      </Typography>
      <DialogActions>
        <Button onClick={closeArchiveDialog}>Cancel</Button>
        <Button variant="contained" color="warning" onClick={handleConfirmArchive}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
