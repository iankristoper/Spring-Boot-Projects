import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export default function ConfirmationDialog({ open, type, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ bgcolor: "black", color: "yellow" }}>
        Confirm {type?.toUpperCase()}
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "#111", color: "white" }}>
        <Typography>
          Are you sure you want to {type} this news post?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ bgcolor: "black" }}>
        <Button onClick={onClose} sx={{ color: "yellow" }}>Cancel</Button>
        <Button variant="contained" sx={{ bgcolor: "yellow", color: "black" }} onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
