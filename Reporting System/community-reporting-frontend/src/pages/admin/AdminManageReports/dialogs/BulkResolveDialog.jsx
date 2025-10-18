import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";

export default function BulkResolveDialog({
  bulkResolveDialog,
  closeBulkResolveDialog,
  setReports,
  setResolveSuccessAlert,
}) {
  const { open, reportIds = [] } = bulkResolveDialog;

  const handleConfirm = async () => {
    try {
      await Promise.all(
        reportIds.map((id) =>
          axios.put(`http://localhost:8080/api/reports/resolve/${id}`)
        )
      );

      setReports((prev) =>
        prev.map((r) =>
          reportIds.includes(r.id) ? { ...r, status: "Resolved" } : r
        )
      );

      setResolveSuccessAlert(true);
      closeBulkResolveDialog();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={closeBulkResolveDialog}
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
          color: "yellow",
          borderBottom: "1px solid rgba(88,255,59,0.2)",
        }}
      >
        Confirm Bulk Resolve
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <Typography sx={{ color: "white", fontSize: "0.95rem" }}>
          Are you sure you want to mark{" "}
          <b style={{ color: "#ffffffff" }}>{reportIds.length}</b> selected
          reports as <b style={{ color: "#58ff3bff" }}>Resolved</b>?
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          borderTop: "1px solid rgba(88,255,59,0.2)",
          p: 2,
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={closeBulkResolveDialog}
          variant="outlined"
          sx={{
            color: "yellow",
            borderColor: "yellow",
            "&:hover": { borderColor: "red", color: "red" },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleConfirm}
          variant="contained"
          sx={{
            bgcolor: "yellow",
            color: "black",
            "&:hover": { bgcolor: "#58ff3bff", color: "black" },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
