import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import ReportForm from "./ReportForm"; // ✅ import the popup form

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [open, setOpen] = useState(false); // ✅ control popup visibility

  // ✅ Fetch user's reports
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    axios
      .get("http://localhost:8080/api/reports/my-reports")
      .then((res) => setReports(res.data))
      .catch((err) => console.error("Error fetching reports:", err));
  };

  // ✅ Handle new report submission
  const handleSubmit = (data) => {
    axios
      .post("http://localhost:8080/api/reports/create", data)
      .then((res) => {
        setReports((prev) => [res.data, ...prev]); // add new report to list
      })
      .catch((err) => console.error("Error creating report:", err));
  };

  // ✅ Handle delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/reports/${id}`)
      .then(() => {
        setReports(reports.filter((r) => r.id !== id));
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: "16px",
          bgcolor: "black",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "yellow", mb: 2 }}
        >
          My Reports
        </Typography>
        <Typography variant="body1">
          Here you can view, edit, and delete your submitted reports.
        </Typography>
      </Paper>

      {/* New Report Button */}
      <Box sx={{ mt: 3, textAlign: "right" }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: "black", color: "yellow", borderRadius: "12px" }}
          onClick={() => setOpen(true)} // ✅ open popup
        >
          New Report
        </Button>
      </Box>

      {/* ✅ Popup Form */}
      <ReportForm
        open={open}
        handleClose={() => setOpen(false)}
        handleSubmit={handleSubmit}
      />

      {/* Table of reports */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "black" }}>
            <TableRow>
              <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>
                Title
              </TableCell>
              <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>
                Category
              </TableCell>
              <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>
                Date Created
              </TableCell>
              <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.length > 0 ? (
              reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>{report.category}</TableCell>
                  <TableCell>{report.status || "Pending"}</TableCell>
                  <TableCell>
                    {new Date(report.dateCreated).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(report.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No reports found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
