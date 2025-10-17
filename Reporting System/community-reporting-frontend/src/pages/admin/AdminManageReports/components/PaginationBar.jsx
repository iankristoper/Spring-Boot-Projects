import React from "react";
import { Box, Typography, TextField, MenuItem, IconButton } from "@mui/material";


export default function PaginationBar({
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  filteredReports,
}) {

  
  return (
    <Box
      sx={{
        bgcolor: "black",
        color: "yellow",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        px: 3,
        py: 1,
        gap: 1.5,
        flexWrap: "nowrap",
      }}
    >
      <Typography variant="body2" sx={{ color: "yellow" }}>
        Rows per page:
      </Typography>

      <TextField
        select
        value={rowsPerPage}
        onChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        variant="outlined"
        size="small"
        sx={{
          width: 70,
          "& .MuiSelect-select": {
            color: "yellow",
            py: "4px",
          },
          "& fieldset": {
            borderColor: "yellow",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "& svg": {
            color: "yellow",
          },
        }}
      >
        {[5, 10, 25, 50].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <Typography variant="body2" sx={{ color: "yellow", mx: 2 }}>
        {`${page * rowsPerPage + 1}-${Math.min(
          (page + 1) * rowsPerPage,
          filteredReports.length
        )} of ${filteredReports.length}`}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          size="small"
          onClick={() => setPage(Math.max(0, page - 1))}
          disabled={page === 0}
          sx={{ color: "yellow" }}
        >
          {"<"}
        </IconButton>
        <IconButton
          size="small"
          onClick={() =>
            setPage(
              Math.min(
                Math.ceil(filteredReports.length / rowsPerPage) - 1,
                page + 1
              )
            )
          }
          disabled={
            page >= Math.ceil(filteredReports.length / rowsPerPage) - 1
          }
          sx={{ color: "yellow" }}
        >
          {">"}
        </IconButton>
      </Box>
    </Box>
  );
}
