import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  useMediaQuery,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ContactUs() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        bgcolor: "#0D0D0D",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          flex: "1 0 auto",
          py: { xs: 6, sm: 10 },
          px: { xs: 2, sm: 4 },
        }}
      >
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant={isMobile ? "h4" : "h3"}
            sx={{
              fontWeight: 800,
              color: "yellow",
              textShadow: "0 0 10px rgba(255,255,0,0.4)",
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: "gray",
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.6,
              fontSize: { xs: "0.95rem", sm: "1rem" },
            }}
          >
            Have questions, feedback, or suggestions?  
            Reach out to us — we’re here to help you build a better community.
          </Typography>
        </Box>

        {/* Main Section */}
        <div className="row g-4 align-items-stretch">
          {/* Left Column */}
          <div className="col-12 col-md-5 d-flex">
            <Paper
              elevation={4}
              sx={{
                flex: 1,
                p: { xs: 3, sm: 4 },
                bgcolor: "rgba(255,255,255,0.05)",
                borderRadius: "16px",
                backdropFilter: "blur(10px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "yellow",
                  fontWeight: 700,
                  mb: 3,
                  textAlign: "center",
                }}
              >
                Get in Touch
              </Typography>

              <Stack spacing={3}>
                <Box display="flex" alignItems="center" gap={2}>
                  <EmailIcon sx={{ color: "yellow", fontSize: 26 }} />
                  <Typography sx={{ color: "gray", fontSize: "0.95rem" }}>
                    support@communityapp.com
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                  <PhoneIcon sx={{ color: "yellow", fontSize: 26 }} />
                  <Typography sx={{ color: "gray", fontSize: "0.95rem" }}>
                    +63 912 345 6789
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                  <LocationOnIcon sx={{ color: "yellow", fontSize: 26 }} />
                  <Typography sx={{ color: "gray", fontSize: "0.95rem" }}>
                    Quezon City, Metro Manila, Philippines
                  </Typography>
                </Box>
              </Stack>

              <Typography
                variant="body2"
                sx={{
                  color: "gray",
                  mt: 4,
                  textAlign: "center",
                  fontStyle: "italic",
                  fontSize: "0.85rem",
                }}
              >
                Office hours: Monday–Friday, 9AM–5PM
              </Typography>
            </Paper>
          </div>

          {/* Right Column */}
          <div className="col-12 col-md-7 d-flex">
            <Paper
              elevation={4}
              sx={{
                flex: 1,
                p: { xs: 3, sm: 4 },
                borderRadius: "16px",
                bgcolor: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "yellow",
                  fontWeight: 700,
                  mb: 3,
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                Send us a message
              </Typography>

              <Stack spacing={3} sx={{ flex: 1 }}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ style: { color: "gray" } }}
                  InputProps={{
                    style: { color: "white" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "gray" },
                      "&:hover fieldset": { borderColor: "yellow" },
                    },
                  }}
                />
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ style: { color: "gray" } }}
                  InputProps={{
                    style: { color: "white" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "gray" },
                      "&:hover fieldset": { borderColor: "yellow" },
                    },
                  }}
                />
                <TextField
                  label="Your Message"
                  variant="outlined"
                  multiline
                  rows={5}
                  fullWidth
                  InputLabelProps={{ style: { color: "gray" } }}
                  InputProps={{
                    style: { color: "white" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "gray" },
                      "&:hover fieldset": { borderColor: "yellow" },
                    },
                  }}
                />

                <Button
                  variant="outlined"
                  startIcon={<SendIcon />}
                  fullWidth
                  sx={{
                    mt: "auto",
                    borderColor: "yellow",
                    color: "yellow",
                    fontWeight: "bold",
                    borderRadius: "10px",
                    textTransform: "none",
                    py: 1.2,
                    "&:hover": {
                      bgcolor: "yellow",
                      color: "black",
                      boxShadow: "0 0 12px rgba(255,255,0,0.4)",
                    },
                  }}
                >
                  Send Message
                </Button>
              </Stack>
            </Paper>
          </div>
        </div>
      </Container>

      {/* Sticky Footer */}
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
        © 2025 Community Reporting App — Building Smarter Communities
      </Box>
    </Box>
  );
}
