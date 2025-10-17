import React from "react";
import {
  Accordion, AccordionSummary, AccordionDetails, Typography,
  IconButton, Tooltip, Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VerifiedIcon from "@mui/icons-material/Verified";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ReportsMobileList({
  reports,
  expandedIds,
  toggleExpand,
  handleViewDetails,
  handleVerifySoon,
  openConfirmResolve,
  openArchiveConfirm,
  openDeleteConfirm,
  getPriorityColor
}) {
  return (
    <Box>
      {reports.map((report) => (
        <Accordion
          key={report.id}
          expanded={expandedIds.includes(report.id)}
          onChange={() => toggleExpand(report.id)}
          sx={{ bgcolor: "#1a1a1a", mb: 1, borderRadius: "8px" }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "yellow" }} />}>
            <Typography sx={{ color: "white", fontWeight: "bold" }}>
              {report.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: "gray", mb: 1 }}>
              {report.description || "No description provided."}
            </Typography>
            <Typography variant="body2" sx={{ color: getPriorityColor(report.priority) }}>
              Priority: {report.priority}
            </Typography>
            <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
              <Tooltip title="View"><IconButton onClick={() => handleViewDetails(report.id)}><VisibilityIcon color="primary" /></IconButton></Tooltip>
              <Tooltip title="Verify"><IconButton sx={{ color: "orange" }} onClick={() => handleVerifySoon(report.id)}><VerifiedIcon /></IconButton></Tooltip>
              <Tooltip title="Resolve"><IconButton sx={{ color: "green" }} onClick={() => openConfirmResolve(report.id)}><CheckCircleIcon /></IconButton></Tooltip>
              <Tooltip title="Archive"><IconButton sx={{ color: "#ffeb3b" }} onClick={() => openArchiveConfirm(report.id)}><ArchiveIcon /></IconButton></Tooltip>
              <Tooltip title="Delete"><IconButton sx={{ color: "red" }} onClick={() => openDeleteConfirm(report.id)}><DeleteIcon /></IconButton></Tooltip>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
