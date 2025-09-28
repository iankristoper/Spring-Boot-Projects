import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/auth/signup", form);

      console.log("✅ Signup Success:", response.data);

      setSuccess("Account created successfully! You can now log in.");
      setForm({ name: "", email: "", password: "" }); // clear form
    } catch (err) {
      console.error("❌ Signup Failed:", err);
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4, borderRadius: "16px", bgcolor: "background.paper" }}>
        <Typography variant="h4" gutterBottom color="secondary" textAlign="center">
          Signup
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth margin="normal" label="Name"
            name="name" value={form.name} onChange={handleChange}
          />
          <TextField
            fullWidth margin="normal" label="Email"
            name="email" value={form.email} onChange={handleChange}
          />
          <TextField
            fullWidth margin="normal" label="Password" type="password"
            name="password" value={form.password} onChange={handleChange}
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" variant="body2" sx={{ mt: 1 }}>
              {success}
            </Typography>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2, borderRadius: "12px" }}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
