import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import SecurityIcon from "@mui/icons-material/Security";
import PeopleIcon from "@mui/icons-material/People";
import InfoIcon from "@mui/icons-material/Info";
import Footer from "../../../components/Footer";



export default function About() {
return (
  <Box
    sx={{
      bgcolor: "#0D0D0D",
      color: "white",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(180deg, #0D0D0D 0%, #121212 100%)",
      position: "relative",
    }}
  >
    {/* Main content section */}
    <Box sx={{ flex: "1 0 auto", position: "relative", py: { xs: 6, sm: 10 } }}>
      {/* Decorative gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "300px",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header Section */}
        <Box textAlign="center" mb={10}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "yellow",
              letterSpacing: "0.5px",
              textShadow: "0 0 15px rgba(255,255,0,0.4)",
            }}
          >
            About the Community Reporting App
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: 3,
              color: "gray",
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Empowering citizens to take part in building a transparent, safe, and
            connected community through real-time reporting and updates.
          </Typography>
        </Box>

        {/* Mission and Vision */}
        <Grid
          container
          spacing={5}
          sx={{
            alignItems: "stretch",
            mb: { xs: 6, md: 10 },
          }}
        >
          {[
            {
              title: "Our Mission",
              desc: "To create a digital bridge between citizens and local authorities by providing a platform for transparent communication, quick reporting, and real-time updates that improve safety, efficiency, and accountability.",
            },
            {
              title: "Our Vision",
              desc: "To build a safer and more collaborative community where everyone has a voice — and every report matters. We envision a future where technology drives unity and quick response to local concerns.",
            },
          ].map((section, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Paper
                elevation={6}
                sx={{
                  height: "100%",
                  bgcolor: "rgba(255,255,255,0.05)",
                  borderRadius: "18px",
                  p: { xs: 3, sm: 4 },
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 8px 30px rgba(255,255,0,0.15)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "yellow",
                    fontWeight: 700,
                    mb: 2,
                    textAlign: "center",
                  }}
                >
                  {section.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "gray",
                    lineHeight: 1.7,
                    textAlign: "center",
                  }}
                >
                  {section.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Features */}
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              color: "yellow",
              mb: 6,
              textShadow: "0 0 10px rgba(255,255,0,0.4)",
            }}
          >
            Key Features
          </Typography>

          <Grid
            container
            spacing={4}
            sx={{
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {[
              {
                icon: <ReportIcon sx={{ fontSize: 48, color: "yellow" }} />,
                title: "Quick Issue Reporting",
                desc: "Easily submit reports about community issues, emergencies, or suggestions directly through the platform.",
              },
              {
                icon: <SecurityIcon sx={{ fontSize: 48, color: "yellow" }} />,
                title: "Verified and Secure",
                desc: "Each report is handled securely and verified by authorized personnel to ensure transparency and credibility.",
              },
              {
                icon: <PeopleIcon sx={{ fontSize: 48, color: "yellow" }} />,
                title: "Collaborative Updates",
                desc: "Stay informed with live updates, track resolutions, and engage with others on issues that matter to your area.",
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={5}
                  sx={{
                    height: "100%",
                    p: 5,
                    borderRadius: "20px",
                    textAlign: "center",
                    bgcolor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 8px 25px rgba(255,255,0,0.2)",
                    },
                  }}
                >
                  {feature.icon}
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 2,
                      fontWeight: 700,
                      color: "white",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1.5,
                      color: "gray",
                      lineHeight: 1.7,
                      fontSize: "0.95rem",
                    }}
                  >
                    {feature.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Divider */}
        <Divider
          sx={{
            my: 10,
            borderColor: "rgba(255,255,255,0.1)",
          }}
        />

        {/* Contact Section */}
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "yellow" }}>
            Get in Touch
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: "gray",
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Have suggestions, questions, or collaboration ideas? We’d love to
            hear from you. Contact us anytime to help make your community a
            better place.
          </Typography>

          <Button
            variant="outlined"
            startIcon={<InfoIcon />}
            sx={{
              mt: 4,
              borderColor: "yellow",
              color: "yellow",
              fontWeight: "bold",
              borderRadius: "12px",
              textTransform: "none",
              px: 4,
              py: 1.2,
              "&:hover": {
                bgcolor: "yellow",
                color: "black",
                boxShadow: "0 0 18px rgba(255,255,0,0.4)",
              },
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Container>
    </Box>

    {/* Sticky Footer */}
    <Footer />
  </Box>
);

}
