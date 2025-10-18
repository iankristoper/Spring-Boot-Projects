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

export default function BulkArchiveDialog({
  bulkArchiveDialog,
  closeBulkArchiveDialog,
  setReports,
  setArchiveSuccessAlert,
}) {
  const { open, reportIds = [] } = bulkArchiveDialog;

  const handleConfirm = async () => {
    try {
      await Promise.all(
        reportIds.map((id) =>
          axios.put(`http://localhost:8080/api/reports/archive/${id}`)
        )
      );

      setReports((prev) => prev.filter((r) => !reportIds.includes(r.id)));
      setArchiveSuccessAlert(true);
      closeBulkArchiveDialog();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={closeBulkArchiveDialog}
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
          borderBottom: "1px solid rgba(255,255,0,0.2)",
        }}
      >
        Confirm Bulk Archive
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <Typography sx={{ color: "white", fontSize: "0.95rem" }}>
          Are you sure you want to{" "}
          <b style={{ color: "#ffeb3b" }}>archive</b> these{" "}
          {reportIds.length} selected reports? They will be moved out of the
          active list.
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          borderTop: "1px solid rgba(255,255,0,0.2)",
          p: 2,
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={closeBulkArchiveDialog}
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
