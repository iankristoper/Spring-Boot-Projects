import React from "react";
import { Box, Typography } from "@mui/material";

export default function FooterBar() {
  return (
    <Box sx={{ p: 2, bgcolor: "#0d0d0d", textAlign: "center" }}>
      <Typography variant="caption" sx={{ color: "gray" }}>
        © {new Date().getFullYear()} Admin Dashboard – All Rights Reserved
      </Typography>
    </Box>
  );
}
