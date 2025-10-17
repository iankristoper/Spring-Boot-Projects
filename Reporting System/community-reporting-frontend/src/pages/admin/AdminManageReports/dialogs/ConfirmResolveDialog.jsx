import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

export default function ConfirmResolveDialog({
  confirmDialog,
  closeConfirmDialog,
  confirmResolve,
}) {
  return (
    <Dialog
      open={confirmDialog.open}
      onClose={closeConfirmDialog}
      PaperProps={{
        sx: {
          bgcolor: "#0d0d0d", // dark background
          color: "white",
          //border: "1px solid rgba(255,255,0,0.4)",
          borderRadius: "12px",
          //boxShadow: "0 0 12px rgba(255,255,0,0.2)",
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
        Confirm Resolution
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <Typography sx={{ color: "white", fontSize: "0.95rem" }}>
          Are you sure you want to mark this report as{" "}
          <b style={{ color: "#00e676" }}>Resolved</b>?
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
          onClick={closeConfirmDialog}
          variant="outlined"
          sx={{
            color: "yellow",
            borderColor: "yellow",
            "&:hover": {
              borderColor: "red",
              color: "red",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={confirmResolve}
          variant="contained"
          sx={{
            bgcolor: "yellow",
            color: "black",
            //fontWeight: "bold",
            "&:hover": {
              bgcolor: "#58ff3bff",
              color: "black",
            },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
