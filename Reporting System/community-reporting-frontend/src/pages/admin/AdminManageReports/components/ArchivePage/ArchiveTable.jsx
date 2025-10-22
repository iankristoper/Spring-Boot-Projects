import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Typography,
  Paper,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ArchiveTable({
  archives = [], // ✅ default empty array to prevent undefined errors
  handleViewDetails,
  handleRestore,
  openDeleteConfirm,
}) {
  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{
        borderRadius: "12px",
        bgcolor: "#141414",
      }}
    >
      <Table>
        {/* ---------- TABLE HEADER ---------- */}
        <TableHead sx={{ bgcolor: "black" }}>
          <TableRow>
            <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>
              Title
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "yellow", fontWeight: "bold" }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        {/* ---------- TABLE BODY ---------- */}
        <TableBody>
          {archives && archives.length > 0 ? ( // ✅ added safety check
            archives.map((item) => (
              <TableRow key={item.id}>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    maxWidth: "400px",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {item.title || "Untitled"}
                </TableCell>

                <TableCell align="center">
                  <Tooltip title="View Details">
                    <IconButton
                      sx={{ color: "rgba(27, 217, 255, 1)" }}
                      onClick={() => handleViewDetails(item.id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Restore">
                    <IconButton
                      sx={{ color: "orange" }}
                      onClick={() => handleRestore(item.id)}
                    >
                      <ReplayIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete Permanently">
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={() => openDeleteConfirm(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} align="center" sx={{ color: "gray" }}>
                <Typography>No archived reports found.</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
