// src/components/common/SnackbarAlert.jsx
import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function SnackbarAlert({ open, message, severity, onClose }) {
  if (open === undefined) return null; // guard render if props missing

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity || "info"} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
