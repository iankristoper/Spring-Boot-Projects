import React, { useState, useEffect } from "react";
import {
  Container,
  useMediaQuery,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import AdminLogHeader from "../LogsPage/AdminLogHeader";
import MobileLayout from "../LogsPage/MobileLayout";
import DesktopLayout from "../LogsPage/DesktopLayout";
import PaginationBar from "../PaginationBar"; // ✅ import pagination bar
import FooterBar from "../FooterBar"; // ✅ import footer bar
import { useNavigate } from "react-router-dom";

export default function AdminRecentLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // ✅ start from 0 for pagination bar compatibility
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetch
    setTimeout(() => {
      const sample = Array.from({ length: 42 }).map((_, i) => ({
        id: i + 1,
        action: ["Login", "Updated report", "Deleted user", "Restored archive"][i % 4],
        username: ["admin01", "supervisor02", "mod03"][i % 3],
        timestamp: new Date().toLocaleString(),
        details: "Performed an administrative action on the system.",
      }));
      setLogs(sample);
      setLoading(false);
    }, 800);
  }, []);

  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedLogs = logs.slice(start, end);

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{ bgcolor: "#0d0d0d" }}
    >
      <Container maxWidth="lg" sx={{ mt: 3, flexGrow: 1 }}>
        <AdminLogHeader isMobile={isMobile} navigate={navigate} />

        {loading ? (
          <Typography align="center" sx={{ color: "gray", mt: 4 }}>
            <CircularProgress size={30} sx={{ color: "yellow" }} />
          </Typography>
        ) : logs.length > 0 ? (
          <>
            {isMobile ? (
              <MobileLayout logs={paginatedLogs} />
            ) : (
              <DesktopLayout logs={paginatedLogs} />
            )}

            {/* ✅ Pagination Bar */}
            <PaginationBar
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              page={page}
              setPage={setPage}
              filteredReports={logs}
            />
          </>
        ) : (
          <Typography align="center" sx={{ color: "gray", mt: 4 }}>
            No recent activity logs found.
          </Typography>
        )}
      </Container>

      {/* ✅ FooterBar at bottom */}
      <FooterBar />
    </Box>
  );
}
