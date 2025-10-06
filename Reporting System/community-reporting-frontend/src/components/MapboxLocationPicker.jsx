import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Button, Box, Typography, Stack } from "@mui/material";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaWFuLWtyaXN0b3BlciIsImEiOiJjbHRvZ3YydmQwZjZmMmlwYWR3dnU0cnJ6In0.evUgsQMRg-M4C04LSGh0yA";

export default function MapboxLocationPicker({ onSelect, onClose }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [120.9842, 14.5995],
      zoom: 12,
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
    map.addControl(geocoder);

    let marker = null;

    map.on("click", async (e) => {
      const { lng, lat } = e.lngLat;
      if (marker) marker.remove();

      marker = new mapboxgl.Marker({ color: "#1976d2" }) // blue marker like MUI primary
        .setLngLat([lng, lat])
        .addTo(map);

      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await res.json();
      const address = data.features[0]?.place_name || "Unknown location";

      setSelectedLocation({ lng, lat, address });
    });

    return () => map.remove();
  }, []);

  const handleUseCurrent = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { longitude, latitude } = pos.coords;
        mapRef.current.flyTo({ center: [longitude, latitude], zoom: 14 });

        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
        );
        const data = await res.json();
        const address = data.features[0]?.place_name || "Unknown location";

        setSelectedLocation({ lng: longitude, lat: latitude, address });
        new mapboxgl.Marker({ color: "#1976d2" })
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current);
      });
    }
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      onSelect(selectedLocation);
      onClose();
    } else {
      alert("Please select a location first.");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          width: "95%",
          maxWidth: 600,
          bgcolor: "background.paper",
          p: 2,
          borderRadius: 2,
          boxShadow: 6,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" fontWeight="600">
          Select Location
        </Typography>

        <Box
          ref={mapContainer}
          sx={{
            width: "100%",
            height: 400,
            borderRadius: 2,
            overflow: "hidden",
          }}
        />

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button variant="outlined" onClick={handleUseCurrent}>
            📍 Use My Location
          </Button>
          <Button variant="contained" onClick={handleConfirm}>
            ✅ Confirm
          </Button>
          <Button color="error" onClick={onClose}>
            ❌ Cancel
          </Button>
        </Stack>

        {selectedLocation && (
          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            📍 {selectedLocation.address}  
            <br />
            🌐 ({selectedLocation.lat.toFixed(5)}, {selectedLocation.lng.toFixed(5)})
          </Typography>
        )}
      </Box>
    </Box>
  );
}
