import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";
import Footer from "../components/Footer";




export default function Analytics() {
  
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, sm: 6 },
          borderRadius: "16px",
          bgcolor: "background.paper",
          textAlign: "center",
          color: "white",
          maxWidth: 500,
        }}
      >
        <BarChartIcon
          sx={{
            fontSize: { xs: 60, sm: 80 },
            color: "yellow",
            mb: 2,
          }}
        />

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: "yellow",
            mb: 1,
            fontSize: { xs: "1.8rem", sm: "2.2rem" },
          }}
        >
          Analytics
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "gray",
            mb: 3,
            fontSize: { xs: "0.95rem", sm: "1rem" },
          }}
        >
          This feature is currently under development.  
          Exciting insights and visual reports are on the way!
        </Typography>

        <Button
          variant="contained"
          sx={{
            bgcolor: "black",
            color: "yellow",
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "bold",
            px: 3,
            py: 1,
            "&:hover": {
              bgcolor: "#222",
            },
          }}
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </Paper>

      {/* Footer - fixed at bottom center */}
      <Typography
        variant="body2"
        sx={{
          color: "gray",
          position: "absolute",
          bottom: 5,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
           {/* Sticky Footer */}
          <Footer />
      </Typography>
   
    </Box>
  );
}
