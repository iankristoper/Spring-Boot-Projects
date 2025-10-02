import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    city: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        form
      );
      console.log("✅ Signup Success:", response.data);

      setSuccess("Account created successfully! You can now log in.");
      setOpenSnackbar(true);

      // clear form
      setForm({ username: "", email: "", password: "", city: "" });

      // redirect after 2s
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("❌ Signup Failed:", err);
      setError(err.response?.data?.message || "Something went wrong. Try again.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4, borderRadius: "16px", bgcolor: "background.paper" }}>
        {/* 🔥 Updated heading style */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{ mb: 2, fontWeight: "bold", textAlign: "left", color: "white" }}
        >
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel
              required={false} // disables default required styling (no *)
              shrink
            >
              City
            </InputLabel>
            <Select
              name="city"
              value={form.city}
              onChange={handleChange}
              label="City"
            >
              <MenuItem value="CEBU">Cebu City</MenuItem>
              <MenuItem value="MANDAUE">Mandaue City</MenuItem>
              <MenuItem value="LAPU-LAPU">Lapu-Lapu City</MenuItem>
            </Select>
          </FormControl>


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

      {/* ✅ Snackbar for success/error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {success ? (
          <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
            {success}
          </Alert>
        ) : error ? (
          <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        ) : null}
      </Snackbar>
    </Container>
  );
}
