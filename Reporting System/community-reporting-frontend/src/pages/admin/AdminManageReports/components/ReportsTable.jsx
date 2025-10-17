import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tooltip, Typography, Paper
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VerifiedIcon from "@mui/icons-material/Verified";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ReportsTable({
  reports,
  handleViewDetails,
  handleVerifySoon,
  openConfirmResolve,
  openArchiveConfirm,
  openDeleteConfirm,
  getPriorityColor
}) {
  return (
    <TableContainer component={Paper} elevation={3} sx={{ borderRadius: "12px", bgcolor: "#141414" }}>
      <Table>
        <TableHead sx={{ bgcolor: "black" }}>
          <TableRow>
            <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>Title</TableCell>
            <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>Status</TableCell>
            <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>Priority</TableCell>
            <TableCell align="center" sx={{ color: "yellow", fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  {report.title || "Untitled Report"}
                </TableCell>
                <TableCell sx={{ color: report.status === "Resolved"
                    ? "#00e676"
                    : report.status === "Verified"
                    ? "orange"
                    : "red"
                }}>
                  {report.status}
                </TableCell>
                <TableCell sx={{ color: getPriorityColor(report.priority) }}>
                  {report.priority}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="View Details">
                    <IconButton color="primary" onClick={() => handleViewDetails(report.id)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Verify">
                    <IconButton sx={{ color: "orange" }} onClick={() => handleVerifySoon(report.id)}>
                      <VerifiedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Resolve">
                    <IconButton sx={{ color: "green" }} onClick={() => openConfirmResolve(report.id)}>
                      <CheckCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Archive">
                    <IconButton sx={{ color: "#ffeb3b" }} onClick={() => openArchiveConfirm(report.id)}>
                      <ArchiveIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton sx={{ color: "red" }} onClick={() => openDeleteConfirm(report.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ color: "gray" }}>
                No reports found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
