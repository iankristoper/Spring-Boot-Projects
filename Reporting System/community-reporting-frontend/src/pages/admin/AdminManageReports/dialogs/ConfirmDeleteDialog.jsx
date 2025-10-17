import React from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

export default function ConfirmDeleteDialog({ deleteDialog, closeDeleteDialog, setReports }) {
  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:8080/api/reports/${deleteDialog.reportId}`, {
        data: { password: deleteDialog.password },
        withCredentials: true,
      })
      .then(() => {
        setReports((prev) => prev.filter((r) => r.id !== deleteDialog.reportId));
        closeDeleteDialog();
      })
      .catch((err) => console.error("Error deleting report", err));
  };

  return (
    <Dialog open={deleteDialog.open} onClose={closeDeleteDialog}>
      <DialogTitle>Delete Report</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Enter your admin password to confirm deletion:
        </Typography>
        <TextField
          label="Admin Password"
          type="password"
          fullWidth
          value={deleteDialog.password}
          onChange={(e) =>
            (deleteDialog.password = e.target.value)
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteDialog}>Cancel</Button>
        <Button color="error" variant="contained" onClick={handleConfirmDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
