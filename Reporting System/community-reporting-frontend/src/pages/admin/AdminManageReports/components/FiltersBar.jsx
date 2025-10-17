import React from "react";
import { Paper, TextField, MenuItem } from "@mui/material";

export default function FiltersBar({ search, setSearch, filter, setFilter }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: "12px",
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TextField
        label="Search Reports"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ flex: 1, minWidth: 220 }}
      />
      <TextField
        label="Filter by Status"
        select
        variant="outlined"
        size="small"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ width: 200 }}
      >
        {["All", "Pending", "Verified", "Resolved"].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Paper>
  );
}
