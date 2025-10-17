import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

export default function ConfirmDeleteDialog({
  deleteDialog,
  setDeleteDialog,
  setReports,
}) {
  // Close helper: keeps your original style/shape of deleteDialog state
  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, reportId: null, password: "" });
  };

  // Confirm delete: uses your original API shape (password in request body)
  const confirmDelete = () => {
    const { reportId, password } = deleteDialog;

    if (!reportId) {
      console.error("No reportId provided to delete.");
      closeDeleteDialog();
      return;
    }

    axios
      .delete(`http://localhost:8080/api/admin/report/delete/${reportId}`, {
        data: { password },          // send password in request body
        withCredentials: true,       // ensure cookies/session are included
      })
      .then((res) => {
        // remove from list (keeps behavior same as original)
        setReports((prev) => prev.filter((r) => r.id !== reportId));
        closeDeleteDialog();
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          alert("Incorrect password. Please try again.");
        } else {
          console.error("Failed to delete report", err);
          // Optionally show a generic alert:
          alert("Failed to delete report. Check console for details.");
        }
      });
  };

  return (
    <Dialog
      open={deleteDialog.open}
      onClose={closeDeleteDialog}
      PaperProps={{
        sx: {
          bgcolor: "#0d0d0d",
          color: "white",
          //border: "1px solid rgba(255,0,0,0.4)",
          borderRadius: "12px",
          //boxShadow: "0 0 15px rgba(255,0,0,0.3)",
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
        Confirm Delete
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <Typography sx={{ color: "white", mb: 2 }}>
          This action will permanently delete the report. Please enter your admin
          password to confirm.
        </Typography>
        <TextField
          type="password"
          label="Admin Password"
          variant="outlined"
          fullWidth
          size="small"
          value={deleteDialog.password}
          onChange={(e) =>
            setDeleteDialog({ ...deleteDialog, password: e.target.value })
          }
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
          onClick={closeDeleteDialog}
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
          onClick={confirmDelete}
          variant="contained"
          sx={{
            bgcolor: "red",
            color: "white",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#ff4444" },
          }}
          disabled={!deleteDialog.password}
        >
          Confirm Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
