import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  Divider,
  Paper,
  Tooltip,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VerifiedIcon from "@mui/icons-material/Verified";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ReportsMobileList({
  filteredReports = [],
  getPriorityColor = () => "gray",
  handleViewDetails,
  handleVerifySoon,
  openConfirmResolve,
  openArchiveConfirm,
  openDeleteConfirm,
}) {
  const [expandedIds, setExpandedIds] = useState([]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="row mt-3">
      {filteredReports.length > 0 ? (
        filteredReports.map((r) => {
          const isExpanded = expandedIds.includes(r.id);
          return (
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
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => toggleExpand(r.id)}
                >
                  <Box>
                    <Tooltip title={r.title || "Untitled Report"}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        noWrap
                        sx={{
                          color: "white",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          display: "block",
                          maxWidth: 200, // 👈 set a fixed or reasonable max width
                          minWidth: 0,
                        }}
                      >
                        {r.title || "Untitled Report"}
                      </Typography>
                    </Tooltip>


                    <Typography
                      variant="body2"
                      sx={{
                        color: getPriorityColor(r.priority),
                        fontWeight: "bold",
                      }}
                    >
                      {r.priority
                        ? r.priority.charAt(0).toUpperCase() +
                          r.priority.slice(1).toLowerCase()
                        : "Low"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          r.status === "Resolved"
                            ? "#00e676"
                            : r.status === "Verified"
                            ? "#ffb74d"
                            : "#ef5350",
                      }}
                    >
                      {r.status || "Pending"}
                    </Typography>
                  </Box>

                  <IconButton
                    sx={{ color: "yellow" }}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(r.id);
                    }}
                  >
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>

                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <Divider sx={{ my: 1 }} />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      mt: 1.5,
                      flexWrap: "wrap",
                    }}
                  >
                    <Tooltip title="View Details">
                      <IconButton
                        sx={{ color: "rgba(27, 217, 255, 1)" }}
                        onClick={() => handleViewDetails(r.id)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Verify">
                      <IconButton
                        onClick={() => handleVerifySoon(r.id)}
                        sx={{ color: "#ffb74d" }}
                      >
                        <VerifiedIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Resolve">
                      <IconButton
                        onClick={() => openConfirmResolve(r.id)}
                        sx={{ color: "green" }}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Archive">
                      <IconButton
                        onClick={() => openArchiveConfirm(r.id)}
                        sx={{ color: "#ffeb3b" }}
                      >
                        <ArchiveIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => openDeleteConfirm(r.id)}
                        sx={{ color: "red" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Collapse>
              </Paper>
            </div>
          );
        })
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
            <Typography>No reports found.</Typography>
          </Paper>
        </div>
      )}
    </div>
  );
}
