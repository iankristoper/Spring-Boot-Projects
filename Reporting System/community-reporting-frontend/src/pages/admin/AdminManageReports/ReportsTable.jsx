
//This is for desktop layout

import React, { useState } from "react";
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, TextField, MenuItem, Tooltip, Typography, Box
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VerifiedIcon from "@mui/icons-material/Verified";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ReportsTable({ reports, search, filter, setSearch, setFilter, onAction }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const paginated = reports.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <TextField label="Search" size="small" value={search} onChange={(e) => setSearch(e.target.value)} />
        <TextField label="Filter" select size="small" value={filter} onChange={(e) => setFilter(e.target.value)}>
          {["All", "Pending", "Verified", "Resolved"].map((opt) => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </TextField>
      </Box>

      <TableContainer>
        <Table>
          <TableHead sx={{ bgcolor: "black" }}>
            <TableRow>
              <TableCell sx={{ color: "yellow" }}>Title</TableCell>
              <TableCell sx={{ color: "yellow" }}>Status</TableCell>
              <TableCell sx={{ color: "yellow" }}>Priority</TableCell>
              <TableCell align="center" sx={{ color: "yellow" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.title}</TableCell>
                <TableCell>{r.status}</TableCell>
                <TableCell>{r.priority}</TableCell>
                <TableCell align="center">
                  <Tooltip title="View"><IconButton><VisibilityIcon /></IconButton></Tooltip>
                  <Tooltip title="Verify"><IconButton><VerifiedIcon sx={{ color: "orange" }} /></IconButton></Tooltip>
                  <Tooltip title="Resolve"><IconButton onClick={() => onAction(r.id, "resolve")} sx={{ color: "green" }}><CheckCircleIcon /></IconButton></Tooltip>
                  <Tooltip title="Archive"><IconButton onClick={() => onAction(r.id, "archive")} sx={{ color: "#ffeb3b" }}><ArchiveIcon /></IconButton></Tooltip>
                  <Tooltip title="Delete"><IconButton onClick={() => onAction(r.id, "delete")} sx={{ color: "red" }}><DeleteIcon /></IconButton></Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
