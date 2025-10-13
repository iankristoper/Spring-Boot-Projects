import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        flexShrink: 0,
        py: 2,
        textAlign: "center",
        color: "gray",
        fontSize: "0.8rem",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      © 2025 Community Reporting App — Building Smarter Communities
    </Box>
  );
}
