
//This is for mobile layout


import React from "react";
import {
  Paper, Box, Typography, IconButton, Collapse, Divider, Tooltip
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VerifiedIcon from "@mui/icons-material/Verified";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ReportsListMobile({ reports, search, filter, setSearch, setFilter, onAction }) {
  const [expandedIds, setExpandedIds] = React.useState([]);
  const toggle = (id) => setExpandedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <>
      {reports.map((r) => {
        const expanded = expandedIds.includes(r.id);
        return (
          <Paper key={r.id} sx={{ p: 2, mb: 2, bgcolor: "#1a1a1a", color: "white" }}>
            <Box display="flex" justifyContent="space-between" onClick={() => toggle(r.id)}>
              <Box>
                <Typography fontWeight="bold">{r.title}</Typography>
                <Typography>{r.priority}</Typography>
                <Typography>{r.status}</Typography>
              </Box>
              <IconButton sx={{ color: "yellow" }}>
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>

            <Collapse in={expanded}>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Tooltip title="View"><IconButton><VisibilityIcon /></IconButton></Tooltip>
                <Tooltip title="Verify"><IconButton><VerifiedIcon sx={{ color: "orange" }} /></IconButton></Tooltip>
                <Tooltip title="Resolve"><IconButton onClick={() => onAction(r.id, "resolve")} sx={{ color: "green" }}><CheckCircleIcon /></IconButton></Tooltip>
                <Tooltip title="Archive"><IconButton onClick={() => onAction(r.id, "archive")} sx={{ color: "#ffeb3b" }}><ArchiveIcon /></IconButton></Tooltip>
                <Tooltip title="Delete"><IconButton onClick={() => onAction(r.id, "delete")} sx={{ color: "red" }}><DeleteIcon /></IconButton></Tooltip>
              </Box>
            </Collapse>
          </Paper>
        );
      })}
    </>
  );
}
