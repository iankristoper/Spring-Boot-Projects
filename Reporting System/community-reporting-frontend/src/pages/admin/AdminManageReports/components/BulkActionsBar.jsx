import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BulkActionsBar({
  selectedReports,
  handleBulkArchive,
  handleBulkResolve,
  handleBulkDelete,
}) {
  if (selectedReports.length === 0) return null;

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 5,
        bgcolor: "#111",
        borderBottom: "1px solid rgba(255,255,0,0.2)",
        py: 1.5,
        px: 2,
        boxShadow: "0 0 10px rgba(255,255,0,0.1)",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography sx={{ color: "yellow", fontWeight: "bold" }}>
          {selectedReports.length} selected
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#4caf50",
              color: "black",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#66ff66" },
            }}
            startIcon={<CheckCircleIcon />}
            onClick={handleBulkResolve}
          >
            Resolve
          </Button>

          <Button
            variant="contained"
            sx={{
              bgcolor: "yellow",
              color: "black",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#ffeb3b" },
            }}
            startIcon={<ArchiveIcon />}
            onClick={handleBulkArchive}
          >
            Archive
          </Button>

          <Button
            variant="outlined"
            sx={{
              color: "red",
              borderColor: "red",
              fontWeight: "bold",
              "&:hover": { bgcolor: "rgba(255,0,0,0.1)" },
            }}
            startIcon={<DeleteIcon />}
            onClick={handleBulkDelete}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
