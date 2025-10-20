import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";
import axios from "axios";

export default function BulkDeleteDialog({
  bulkDeleteDialog,
  closeBulkDeleteDialog,
  setReports,
}) {
  const [password, setPassword] = React.useState("");

  // Confirm bulk delete
  const confirmBulkDelete = () => {
    const { reportIds } = bulkDeleteDialog;

    if (!reportIds || reportIds.length === 0) {
      console.error("No reports selected for bulk delete.");
      closeBulkDeleteDialog();
      return;
    }

    axios
      .delete("http://localhost:8080/api/admin/report/delete/bulk", {
        data: { reportIds, password },
        withCredentials: true,
      })
      .then(() => {
        setReports((prev) => prev.filter((r) => !reportIds.includes(r.id)));
        setPassword("");
        closeBulkDeleteDialog();
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          alert("Incorrect password. Please try again.");
        } else {
          console.error("Failed to bulk delete reports", err);
          alert("Failed to delete reports. Check console for details.");
        }
      });
  };

  return (
    <Dialog
      open={bulkDeleteDialog.open}
      onClose={closeBulkDeleteDialog}
      PaperProps={{
        sx: {
          bgcolor: "#0d0d0d",
          color: "white",
          borderRadius: "12px",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          color: "red",
          borderBottom: "1px solid rgba(255,0,0,0.2)",
        }}
      >
        Confirm Bulk Delete
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <Typography sx={{ color: "white", mb: 2 }}>
          You are about to permanently delete{" "}
          <strong>{bulkDeleteDialog.reportIds?.length || 0}</strong> report(s).{" "}
          This action cannot be undone.  
          Please enter your admin password to confirm.
        </Typography>

        <TextField
          type="password"
          label="Admin Password"
          variant="outlined"
          fullWidth
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            input: { color: "white" },
            "& label": { color: "gray" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "red" },
              "&:hover fieldset": { borderColor: "white" },
            },
          }}
        />
      </DialogContent>

      <DialogActions
        sx={{
          borderTop: "1px solid rgba(255,0,0,0.2)",
          p: 2,
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={() => {
            setPassword("");
            closeBulkDeleteDialog();
          }}
          variant="outlined"
          sx={{
            color: "red",
            borderColor: "red",
            "&:hover": { borderColor: "red", color: "red" },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={confirmBulkDelete}
          variant="contained"
          sx={{
            bgcolor: "red",
            color: "white",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#ff4444" },
          }}
          disabled={!password}
        >
          Confirm Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
