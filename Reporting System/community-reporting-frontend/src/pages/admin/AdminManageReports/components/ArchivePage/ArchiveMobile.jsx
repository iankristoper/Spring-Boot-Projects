import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ArchiveMobileList({
  archivedReports = [],
  handleViewDetails,
  handleRestore,
  openDeleteConfirm,
}) {
  return (
    <div className="row mt-3">
      {archivedReports.length > 0 ? (
        archivedReports.map((r) => (
          <div className="col-12 mb-3" key={r.id}>
            <Paper
              elevation={4}
              sx={{
                p: 2,
                width: "100%",
                borderRadius: "12px",
                bgcolor: "#1a1a1a",
                color: "white",
              }}
            >
              {/* Title */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{
                    color: "white",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    maxWidth: "70%",
                  }}
                >
                  {r.title || "Untitled Report"}
                </Typography>

                {/* Actions */}
                <Box>
                  <Tooltip title="View Details">
                    <IconButton
                      sx={{ color: "rgba(27, 217, 255, 1)" }}
                      onClick={() => handleViewDetails(r.id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Restore">
                    <IconButton
                      sx={{ color: "orange" }}
                      onClick={() => handleRestore(r.id)}
                    >
                      <ReplayIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={() => openDeleteConfirm(r.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Paper>
          </div>
        ))
      ) : (
        <div className="col-12">
          <Paper
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: "12px",
              color: "gray",
              bgcolor: "#1a1a1a",
            }}
          >
            <Typography>No archived reports found.</Typography>
          </Paper>
        </div>
      )}
    </div>
  );
}
