import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Button, Box, Typography, Stack, IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import useMediaQuery from "@mui/material/useMediaQuery";





mapboxgl.accessToken =
    "pk.eyJ1IjoiaWFuLWtyaXN0b3BlciIsImEiOiJjbHRvZ3YydmQwZjZmMmlwYWR3dnU0cnJ6In0.evUgsQMRg-M4C04LSGh0yA";


export default function MapboxLocationPicker({ onSelect, onClose }) {
  
    const isMobile = useMediaQuery("(max-width:600px)");


    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const geocoderRef = useRef(null);



    useEffect(() => {
        if (!mapContainer.current) return;

        const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [123.5942, 10.3195],
        zoom: 12,
        });

        mapRef.current = map;

        // Add native fullscreen + navigation controls
        const fullscreenCtrl = new mapboxgl.FullscreenControl();
        map.addControl(fullscreenCtrl, "top-right");
        map.addControl(new mapboxgl.NavigationControl(), "top-right");

        let marker = null;

        map.on("click", async (e) => {
        const { lng, lat } = e.lngLat;
        if (marker) marker.remove();

        marker = new mapboxgl.Marker({ color: "#1976d2" })
            .setLngLat([lng, lat])
            .addTo(map);

        const res = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
        );
        const data = await res.json();
        const address = data.features[0]?.place_name || "Unknown location";

        setSelectedLocation({ lng, lat, address });
        });

        // Listen for fullscreenchange
        map.on("fullscreenchange", () => {
        const isFull = document.fullscreenElement !== null;
        setIsFullscreen(isFull);

        // When in fullscreen, add geocoder; remove when exiting
        if (isFull) {
            const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl,
            });
            map.addControl(geocoder, "top-left");
            geocoderRef.current = geocoder;
        } else {
            if (geocoderRef.current) {
            map.removeControl(geocoderRef.current);
            geocoderRef.current = null;
            }
        }
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
            new mapboxgl.Marker({ color: "#F44336" })
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

    const toggleFullscreen = () => {
        const mapElement = mapContainer.current;
        if (!document.fullscreenElement) {
        mapElement.requestFullscreen?.();
        } else {
        document.exitFullscreen?.();
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
            width: isFullscreen ? "100%" : "95%",
            height: isFullscreen ? "100%" : "auto",
            maxWidth: isFullscreen ? "100%" : 600,
            bgcolor: "background.paper",
            p: 2,
            borderRadius: isFullscreen ? 0 : 2,
            boxShadow: 6,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            position: isFullscreen ? "fixed" : "relative",
            inset: isFullscreen ? 0 : "auto",
            transition: "all 0.3s ease",
            }}
        >
            {/* Header */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="600">
                {isFullscreen ? "Select Location (Fullscreen)" : "Select Location"}
            </Typography>
        
            </Stack>

            {/* Map */}
            <Box
            ref={mapContainer}
            sx={{
                width: "100%",
                height: isFullscreen ? "100%" : 400,
                flexGrow: isFullscreen ? 1 : 0,
                borderRadius: 2,
                overflow: "hidden",
            }}
            />

            {/* Controls (normal view) */}
            {!isFullscreen && (
            <>
                <Stack
                    direction={isMobile ? "column" : "row"}
                    spacing={isMobile ? 0.5 : 1}
                    justifyContent="flex-end"
                    sx={{
                        width: "100%",
                        "& .MuiButton-root": {
                        fontSize: isMobile ? "0.75rem" : "0.875rem",
                        py: isMobile ? 0.7 : 1,
                        px: isMobile ? 1.5 : 2,
                        borderRadius: isMobile ? 1.5 : 2,
                        },
                    }}
                    >
                    <Button variant="outlined" onClick={handleUseCurrent}>
                        Use My Location
                    </Button>
                    <Button variant="contained" onClick={handleConfirm}>
                        Confirm
                    </Button>
                    <Button color="error" onClick={onClose}>
                        Cancel
                    </Button>
                </Stack>


                {selectedLocation && (
                <Box
                    sx={{
                    mt: isMobile ? 1.5 : 2,
                    p: isMobile ? 1.2 : 1.5,
                    bgcolor: "background.default",
                    borderRadius: 2,
                    boxShadow: isMobile ? 1 : 2,
                    border: "1px solid",
                    borderColor: "divider",
                    width: "100%",
                    }}
                >
                    <Typography
                    variant={isMobile ? "body2" : "body1"}
                    sx={{
                        color: "text.secondary",
                        wordBreak: "break-word",
                        fontSize: isMobile ? "0.8rem" : "0.9rem",
                        lineHeight: 1.5,
                    }}
                    >
                    📍 <b>{selectedLocation.address}</b>
                    </Typography>
                    <Typography
                    variant="caption"
                    sx={{
                        display: "block",
                        color: "text.disabled",
                        mt: 0.5,
                        fontSize: isMobile ? "0.7rem" : "0.8rem",
                    }}
                    >
                    🌐 ({selectedLocation.lat.toFixed(5)}, {selectedLocation.lng.toFixed(5)})
                    </Typography>
                </Box>
                )}

            </>
            )}

            {/* Floating Controls (fullscreen) */}
            {isFullscreen && (
            <Box
                sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                zIndex: 2000,
                }}
            >
                <Button
                variant="contained"
                color="primary"
                onClick={handleUseCurrent}
                >
                Use My Location
                </Button>
                <Button
                variant="contained"
                color="success"
                onClick={handleConfirm}
                >
                Confirm
                </Button>
                <Button
                variant="outlined"
                color="error"
                onClick={() => document.exitFullscreen()}
                >
                Exit Fullscreen
                </Button>
            </Box>
            )}
        </Box>
        </Box>
    );
}
