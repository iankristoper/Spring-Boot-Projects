import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function LocationPicker({ open, onClose, onSelect }) {
  const [position, setPosition] = useState({ lat: 14.5995, lng: 120.9842 }); // Default: Manila

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });
    return position ? <Marker position={position}></Marker> : null;
  }

  const handleConfirm = () => {
    onSelect(position);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Select Location</DialogTitle>
      <DialogContent>
        <div style={{ height: "400px" }}>
          <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            <LocationMarker />
          </MapContainer>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} variant="contained">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

export default LocationPicker;
