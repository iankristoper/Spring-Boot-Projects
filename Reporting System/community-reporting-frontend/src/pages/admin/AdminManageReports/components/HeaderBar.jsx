import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListAltIcon from "@mui/icons-material/ListAlt";

export default function HeaderBar({ navigate, isMobile }) {
  return (
    <>
      <Typography variant="h5" fontWeight="bold" sx={{ color: "yellow", mb: 1 }}>
        Manage Reports
      </Typography>
      <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
        View, verify, resolve, archive, or delete citizen reports.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddBoxIcon />}
          onClick={() => navigate("/admin/reports/new")}
        >
          Create Report
        </Button>
        {!isMobile && (
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ListAltIcon />}
            onClick={() => navigate("/admin/reports/archive")}
          >
            View Archived
          </Button>
        )}
      </Box>

      <Divider sx={{ mb: 3, borderColor: "#333" }} />
    </>
  );
}
