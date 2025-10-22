import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Divider,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate } from "react-router-dom";





mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

export default function ViewReport() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const mapContainerRef = useRef(null);

  // Helper to format strings like WATER_SUPPLY → Water Supply
  const formatLabel = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Helper to extract coordinates if present in parentheses
  const extractCoordinates = (location) => {
    if (!location) return { place: "", coords: "", lat: null, lng: null };
    const match = location.match(/\(([-\d.]+),\s*([-\d.]+)\)/);
    const coords = match ? `${match[1]}, ${match[2]}` : "";
    const place = location.replace(/\s*\(.*?\)\s*/g, "").trim();
    return {
      place,
      coords,
      lat: match ? parseFloat(match[1]) : null,
      lng: match ? parseFloat(match[2]) : null,
    };
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/reports/fetch/${id}`, {
        withCredentials: true,
      })
      .then((res) => setReport(res.data))
      .catch((err) => console.error("Error fetching report:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const { place, coords, lat, lng } = extractCoordinates(report?.location);

  // 🗺️ Initialize mini map after data loads
  useEffect(() => {
    if (!lat || !lng || !mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [lng, lat],
      zoom: 12,
      
    });

    // 🧭 Add fullscreen button (bottom-right by default)
    const fullscreenControl = new mapboxgl.FullscreenControl();
    map.addControl(fullscreenControl, "top-right");
    new mapboxgl.Marker({ color: "#00e5ff" })
      .setLngLat([lng, lat])
      .addTo(map);

    return () => map.remove();
  }, [lat, lng]);

  if (loading) {
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <CircularProgress color="warning" />
        <Typography sx={{ mt: 2, color: "text.secondary" }}>
          Getting report...
        </Typography>
      </Container>
    );
  }

  if (!report) {
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <Typography color="error">Report not found.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: "16px",
          bgcolor: "black",
          color: "white",
        }}
      >
        {/* 🔙 Back Button */}

        <Button
          startIcon={<ArrowBackIcon />}
          sx={{
            color: "yellow",
            mb: 3,
            "&:hover": { bgcolor: "rgba(255,255,0,0.1)" },
          }}
          onClick={() => navigate("/reports")}
        >
          Back to Reports
        </Button>

        {/* 🏷️ Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: "yellow",
            mb: 2,
            whiteSpace: "normal", // allow line breaks
            wordWrap: "break-word",
            overflowWrap: "break-word",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3, // limit to 3 lines (since it's a big header)
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {report.title || "Untitled Report"}
        </Typography>


        {/* 📊 Meta Information */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mb: 2, flexWrap: "wrap" }}
        >
          <Chip
            label={`Category: ${formatLabel(report.category)}`}
            sx={{
              bgcolor: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          />
          <Chip
            label={`Status: ${formatLabel(report.status)}`}
            sx={{
              bgcolor:
                report.status === "Pending"
                  ? "rgba(255,255,0,0.2)"
                  : report.status === "Resolved"
                  ? "rgba(0,255,0,0.2)"
                  : "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          />
          <Chip
            label={`Priority: ${formatLabel(report.priority)}`}
            sx={{
              bgcolor:
                report.priority === "HIGH"
                  ? "rgba(255,0,0,0.2)"
                  : report.priority === "MEDIUM"
                  ? "rgba(255,165,0,0.2)"
                  : "rgba(0,255,0,0.2)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          />
        </Stack>

        {/* 🗓️ Date */}
        <Typography
          variant="body2"
          sx={{ mb: 2, color: "rgba(255,255,255,0.6)" }}
        >
          Reported on:{" "}
          {new Date(report.dateCreated).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </Typography>

        <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.2)" }} />

        {/* 📍 Location + Coordinates */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            <b>Location:</b> {place || "N/A"}
          </Typography>
          <Typography variant="body1">
            <b>Coordinates:</b>{" "}
            {coords ? (
              <a
                href={`https://www.google.com/maps?q=${coords}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#00e5ff", textDecoration: "none" }}
              >
                {coords}
              </a>
            ) : (
              "N/A"
            )}
          </Typography>
        </Box>

        {/* 🗺️ Mini Map */}
        {lat && lng && (
          <Box
            ref={mapContainerRef}
            sx={{
              mt: 2,
              mb: 3,
              height: 450,
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
          />
        )}

        {/* 📝 Description */}
        {/* 📝 Description */}
        <Typography
          variant="body1"
          sx={{
            p: 2,
            bgcolor: "rgba(255,255,255,0.05)",
            borderRadius: "10px",
            whiteSpace: "pre-wrap",     // keeps line breaks if present
            wordBreak: "break-word",    // breaks long words or URLs
            overflowWrap: "break-word", // ensures proper text wrapping
            lineHeight: 1.6,            // improves readability
          }}
        >
          {report.description || "No description provided."}
        </Typography>


        {/* 🖼️ Media */}
        {report.media && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Attached Media:
            </Typography>
            <img
              src={report.media}
              alt="report media"
              style={{
                maxWidth: "100%",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
}
