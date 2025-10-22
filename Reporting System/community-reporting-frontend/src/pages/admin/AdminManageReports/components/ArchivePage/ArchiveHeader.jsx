import React from "react";
import { Paper, Box, IconButton, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HistoryIcon from "@mui/icons-material/History";

export default function ArchiveHeaderBar({ isMobile, navigate }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: "16px",
        bgcolor: "black",
        color: "white",
        position: "relative",
      }}
    >
      {/* Mobile back button */}
      {isMobile && (
        <IconButton
          onClick={() => navigate("/admin/admin-home")}
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            color: "yellow",
            bgcolor: "black",
            border: "1px solid yellow",
            "&:hover": { bgcolor: "#222" },
          }}
          size="small"
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
      )}

      <Box
        display="flex"
        alignItems="center"
        justifyContent={isMobile ? "center" : "space-between"}
        flexWrap="wrap"
        gap={1}
      >
        {/* Left Section (Back + Log buttons) */}
        {!isMobile && (
          <Box display="flex" alignItems="center" gap={1.5}>
            <Button
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              size="medium"
              sx={{
                color: "yellow",
                borderColor: "yellow",
                "&:hover": { borderColor: "white", color: "white" },
              }}
              onClick={() => navigate("/admin/admin-home")}
            >
              Back
            </Button>

            <Button
              startIcon={<HistoryIcon />}
              variant="outlined"
              size="medium"
              sx={{
                color: "yellow",
                borderColor: "yellow",
                "&:hover": { borderColor: "white", color: "white" },
              }}
              onClick={() => navigate("/admin/activity-log")}
            >
              Activity Log
            </Button>
          </Box>
        )}

        {/* Title */}
        <Typography
          variant={isMobile ? "h6" : "h5"}
          fontWeight="bold"
          sx={{
            color: "yellow",
            textAlign: isMobile ? "center" : "right",
            width: isMobile ? "100%" : "auto",
            letterSpacing: "0.5px",
          }}
        >
          Archived Reports
        </Typography>
      </Box>
    </Paper>
  );
}
