import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ConstructionIcon from "@mui/icons-material/Construction";

export default function HomeComingSoon() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: "16px",
          bgcolor: "#1a1a1a",
          border: "1px solid rgba(255,255,0,0.3)",
          textAlign: "center",
          color: "white",
          maxWidth: 500,
          width: "100%",
        }}
      >
        <ConstructionIcon sx={{ fontSize: 60, color: "yellow", mb: 2 }} />
        <Typography variant="h5" fontWeight="bold" sx={{ color: "yellow", mb: 1 }}>
          Feature Coming Soon!
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", mb: 4 }}>
          This section is currently under development.  
          Our team is working hard to bring it to life — stay tuned!
        </Typography>

        <Button
          variant="outlined"
          sx={{
            color: "yellow",
            borderColor: "yellow",
            "&:hover": { bgcolor: "rgba(255,255,0,0.1)" },
          }}
          onClick={() => navigate("/admin/admin-home")}
        >
          Back to Reports
        </Button>
      </Paper>
    </Box>
  );
}
