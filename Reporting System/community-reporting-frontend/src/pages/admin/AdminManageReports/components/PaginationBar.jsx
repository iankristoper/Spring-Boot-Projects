import React from "react";
import { TablePagination } from "@mui/material";

export default function PaginationBar({ filteredReports, rowsPerPage, setRowsPerPage, page, setPage }) {
  return (
    <TablePagination
      component="div"
      count={filteredReports.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={(_, newPage) => setPage(newPage)}
      onRowsPerPageChange={(e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
      }}
      sx={{ color: "white" }}
    />
  );
}
