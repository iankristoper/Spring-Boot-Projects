import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // ✅ import useNavigate

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // ✅ create navigate instance

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/auth/login", form);

      console.log("✅ Login Success:", response.data);

      // Save token in localStorage
      localStorage.setItem("token", response.data.token);

      // ✅ Redirect to dashboard (no page reload)
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Login Failed:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4, borderRadius: "16px", bgcolor: "background.paper" }}>
        <Typography variant="h4" gutterBottom color="secondary" textAlign="center">
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth margin="normal" label="Username"
            name="username" value={form.username} onChange={handleChange}
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

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2, borderRadius: "12px" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
