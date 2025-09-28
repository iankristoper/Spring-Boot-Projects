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
      <Box>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          sx={{ mr: 2, borderRadius: "12px", px: 4 }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          to="/signup"
          sx={{ borderRadius: "12px", px: 4 }}
        >
          Signup
        </Button>
      </Box>
    </Container>
  );
}
