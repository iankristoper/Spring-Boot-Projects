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

/**import React from "react";
import { Box } from "@mui/material";

export default function FooterBar() {
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
      © 2025 Community Reporting App — Admin Portal
    </Box>
  );
}
 */