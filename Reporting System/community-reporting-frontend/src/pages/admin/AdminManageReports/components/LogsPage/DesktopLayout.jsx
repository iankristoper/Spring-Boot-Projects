import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export default function DesktopLayout({ logs }) {
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
        <TableHead sx={{ bgcolor: "black" }}>
          <TableRow>
            <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>Action</TableCell>
            <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>Username</TableCell>
            <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>Timestamp</TableCell>
            <TableCell align="center" sx={{ color: "yellow", fontWeight: "bold" }}>
              Details
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                {log.action}
              </TableCell>
              <TableCell sx={{ color: "white" }}>{log.username}</TableCell>
              <TableCell sx={{ color: "white" }}>{log.timestamp}</TableCell>
              <TableCell align="center">
                <Tooltip title={log.details}>
                  <InfoIcon sx={{ color: "rgba(27, 217, 255, 1)" }} />
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
