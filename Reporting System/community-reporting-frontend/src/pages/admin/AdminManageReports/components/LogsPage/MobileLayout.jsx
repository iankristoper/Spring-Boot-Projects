import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  IconButton,
  Collapse,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import InfoIcon from "@mui/icons-material/Info";

export default function MobileLayout({ logs }) {
  const [expanded, setExpanded] = useState([]);

  const toggleExpand = (id) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="row mt-2">
      {logs.map((log) => {
        const isExpanded = expanded.includes(log.id);
        return (
          <div className="col-12 mb-3" key={log.id}>
            <Paper
              elevation={4}
              sx={{
                p: 2,
                borderRadius: "12px",
                bgcolor: "#1a1a1a",
                color: "white",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                onClick={() => toggleExpand(log.id)}
              >
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ color: "yellow" }}
                  >
                    {log.action}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    {log.username}
                  </Typography>
                </Box>

                <IconButton
                  sx={{ color: "yellow" }}
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(log.id);
                  }}
                >
                  {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>

              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
                  <strong>Timestamp:</strong> {log.timestamp}
                </Typography>
                <Box
                  mt={1.5}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{ color: "rgba(27, 217, 255, 1)" }}
                >
                  <InfoIcon fontSize="small" />
                  <Typography variant="body2">{log.details}</Typography>
                </Box>
              </Collapse>
            </Paper>
          </div>
        );
      })}
    </div>
  );
}
