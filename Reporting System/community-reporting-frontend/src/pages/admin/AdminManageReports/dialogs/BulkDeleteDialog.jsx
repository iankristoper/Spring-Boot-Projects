import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";

export default function BulkDeleteDialog({
  bulkDeleteDialog,
  closeBulkDeleteDialog,
  setReports,
  setDeleteSuccessAlert,
}) {
  const { open, reportIds = [] } = bulkDeleteDialog;
  const [password, setPassword] = useState("");

  const handleConfirm = async () => {
    try {
      await Promise.all(
        reportIds.map((id) =>
          axios.delete(`http://localhost:8080/api/reports/delete/${id}`, {
            data: { password },
          })
        )
      );

      setReports((prev) =>
        prev.filter((r) => !reportIds.includes(r.id))
      );

      setDeleteSuccessAlert(true);
      closeBulkDeleteDialog();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={closeBulkDeleteDialog}>
      <DialogTitle>Confirm Bulk Delete</DialogTitle>
      <DialogContent>
        <Typography mb={2}>
          This will permanently delete {reportIds.length} selected reports.
        </Typography>
        <TextField
          label="Enter Admin Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeBulkDeleteDialog}>Cancel</Button>
        <Button
          onClick={handleConfirm}
          color="error"
          variant="contained"
          disabled={!password}
        >
          Confirm Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
