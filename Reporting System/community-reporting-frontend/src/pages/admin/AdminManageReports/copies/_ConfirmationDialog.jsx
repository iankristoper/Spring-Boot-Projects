import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

const actionColors = {
  resolve: { title: "Confirm Resolution", color: "#00e676" },
  archive: { title: "Confirm Archive", color: "#ffeb3b" },
  delete: { title: "Confirm Deletion", color: "red" },
};

export default function ConfirmationDialog({ open, onConfirm, onClose, type }) {
  if (!type) return null;
  const { title, color } = actionColors[type];

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { bgcolor: "#0d0d0d", color: "white", borderRadius: 2 } }}>
      <DialogTitle sx={{ color }}>{title}</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to <b style={{ color }}>{type}</b> this report?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "gray" }}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" sx={{ bgcolor: color, color: "black" }}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
