import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Box, Paper, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionMessage, setSessionMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.sessionExpired) {
      setSessionMessage("Your session has expired, please log in again.");
    } else if (location.state?.roleError) {
      setSessionMessage(location.state.roleError);
    }
  }, [location]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSessionMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        form,
        { withCredentials: true }
      );

      // Expected backend response example:
      // {
      //   "username": "admin",
      //   "role": "ROLE_ADMIN",
      //   "token": "..."
      // }

      const userData = response.data;

      // Save session data
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("expiry", Date.now() + 7200000); // 1 hour

      // Redirect based on role
      if (userData.role === "ROLE_ADMIN") {
        navigate("/admin"); // redirect to admin home
      } else if (userData.role === "ROLE_USER") {
        navigate("/dashboard"); // normal user dashboard
      } else {
        navigate("/"); // fallback
      }
    } catch (err) {
      console.error("❌ Login Failed:", err);
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4, borderRadius: "16px", bgcolor: "background.paper" }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ mb: 2, fontWeight: "bold", textAlign: "left", color: "white" }}
        >
          Log in
        </Typography>

        {sessionMessage && <Alert severity="warning" sx={{ mb: 2 }}>{sessionMessage}</Alert>}

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
