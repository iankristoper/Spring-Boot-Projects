import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";



export default function Home() {

  
  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3" gutterBottom color="secondary">
        Welcome to the Reporting App
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }} color="text.secondary">
        A modern platform for community issue reporting and transparency.
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" }, // 👈 Stack vertically on mobile, row on desktop
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          sx={{ borderRadius: "12px", px: 4, width: { xs: "80%", sm: "auto" } }} // 👈 wider on mobile
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          to="/signup"
          sx={{ borderRadius: "12px", px: 4, width: { xs: "80%", sm: "auto" } }}
        >
          Signup
        </Button>
      </Box>
    </Container>
  );
}
