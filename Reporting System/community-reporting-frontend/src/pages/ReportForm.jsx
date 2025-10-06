import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


// Setup Leaflet default icon (important or map marker won't show)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});






export default function ReportForm({ open, handleClose, handleSubmit }) {

    const [openMap, setOpenMap] = useState(false);
    const [position, setPosition] = useState({ lat: 14.5995, lng: 120.9842 }); // Default: Manila
  

    




    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    //States
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        priority: "",
        location: "",
        mediaFiles: [],
        mediaPreviews: [],
    });

    //Priority dialog state (move this OUTSIDE of onSubmit)
    const [priorityDialog, setPriorityDialog] = useState({
        open: false,
        level: "",
        message: "",
    });

    //Handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const previews = files.map((file) =>
        file.type.startsWith("image/") || file.type.startsWith("video/")
            ? URL.createObjectURL(file)
            : null
        );

        setFormData({
        ...formData,
        mediaFiles: [...formData.mediaFiles, ...files],
        mediaPreviews: [...formData.mediaPreviews, ...previews],
        });
    };

    const handleRemoveMedia = (index) => {
        const updatedFiles = [...formData.mediaFiles];
        const updatedPreviews = [...formData.mediaPreviews];
        updatedFiles.splice(index, 1);
        updatedPreviews.splice(index, 1);
        setFormData({
        ...formData,
        mediaFiles: updatedFiles,
        mediaPreviews: updatedPreviews,
        });
    };

    const onSubmit = () => {
        handleSubmit(formData);
        handleClose();
        setFormData({
        title: "",
        description: "",
        category: "",
        priority: "",
        location: "",
        mediaFiles: [],
        mediaPreviews: [],
        });
    };

    //Priority dialog logic
    const handlePriorityChange = (e) => {
        const value = e.target.value;
        let message = "";

        switch (value) {
        case "LOW":
            message = "Low Urgency — minor issue that can be resolved later without impact.";
            break;
        case "MEDIUM":
            message = "Medium Urgency — should be addressed soon but not critical yet.";
            break;
        case "HIGH":
            message = "High Urgency — needs immediate attention to prevent bigger issues.";
            break;
        case "CRITICAL":
            message = "Critical Urgency — severe problem that requires urgent action.";
            break;
        default:
            message = "";
        }

        setPriorityDialog({ open: true, level: value, message });
    };

    const confirmPriority = () => {
        setFormData({ ...formData, priority: priorityDialog.level });
        setPriorityDialog({ open: false, level: "", message: "" });
    };

    const cancelPriority = () => {
        setPriorityDialog({ open: false, level: "", message: "" });
    };

 
    //Confirm button handler
    const handleConfirmLocation = async () => {
        try {
            const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}`
            );
            const address = res.data.display_name;
            setFormData({
            ...formData,
            location: `${address} (${position.lat}, ${position.lng})`,
            });
        } catch (error) {
            console.error("Error fetching address:", error);
            setFormData({
            ...formData,
            location: `(${position.lat}, ${position.lng})`,
            });
        }
        setOpenMap(false);
    };

    //Get current user location (GPS)
    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setPosition({ lat: latitude, lng: longitude });
            },
            (err) => {
                console.error("Geolocation error:", err);
                alert("Unable to fetch your current location. Please allow location access.");
            }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };



    return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        
      {/* Priority Confirmation Dialog */}
      <Dialog
        open={priorityDialog.open}
        onClose={cancelPriority}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Confirm Priority Level</DialogTitle>
        <DialogContent>
          <p>{priorityDialog.message}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelPriority}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={confirmPriority}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <DialogTitle>New Report</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Title"
          name="title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Description"
          name="description"
          fullWidth
          multiline
          rows={3}
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Category"
          name="category"
          fullWidth
          select
          value={formData.category}
          onChange={handleChange}
        >
          <MenuItem value="EMERGENCY">Emergency</MenuItem>
          <MenuItem value="ACCIDENTS">Accidents</MenuItem>
          <MenuItem value="ROAD_ISSUE">Road Issue</MenuItem>
          <MenuItem value="GARBAGE">Garbage</MenuItem>
          <MenuItem value="SAFETY">Safety</MenuItem>
          <MenuItem value="WATER_SUPPLY">Water Supply</MenuItem>
          <MenuItem value="ELECTRICITY">Electricity</MenuItem>
          <MenuItem value="TRAFFIC">Traffic</MenuItem>
          <MenuItem value="NOISE">Noise</MenuItem>
          <MenuItem value="POLLUTION">Pollution</MenuItem>
          <MenuItem value="ANIMAL_CONTROL">Animal Control</MenuItem>
          <MenuItem value="FLOODING">Flooding</MenuItem>
          <MenuItem value="FIRE_HAZARD">Fire Hazard</MenuItem>
          <MenuItem value="VANDALISM">Vandalism</MenuItem>
          <MenuItem value="INFRASTRUCTURE">Infrastructure</MenuItem>
          <MenuItem value="OTHERS">Others</MenuItem>
        </TextField>
        <TextField
          margin="dense"
          label="Priority Level"
          name="priority"
          fullWidth
          select
          value={formData.priority}
          onChange={handlePriorityChange}
        >
          <MenuItem value="LOW">Low Urgency</MenuItem>
          <MenuItem value="MEDIUM">Medium Urgency</MenuItem>
          <MenuItem value="HIGH">High Urgency</MenuItem>
          <MenuItem value="CRITICAL">Critical Urgency</MenuItem>
        </TextField>

        {/* Location Field */}
        <TextField
          label="Location"
          name="location"
          fullWidth
          margin="dense"
          value={formData.location}
          InputProps={{ readOnly: true }}
        />

        {/* Button to open map */}
        <Button
          variant="outlined"
          onClick={() => setOpenMap(true)}
          sx={{ mt: 1, mb: 2 }}
        >
          Select Location
        </Button>

        {/* 🌍 Map Dialog (added here) */}
        <Dialog open={openMap} onClose={() => setOpenMap(false)} fullWidth maxWidth="sm">
          <DialogTitle>Select Location</DialogTitle>
          <div style={{ height: "400px" }}>
            <MapContainer
              center={position}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              whenCreated={(map) => {
                map.on("click", (e) => setPosition(e.latlng));
              }}
            >
              <TileLayer
                attribution='© OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={position}
                draggable
                eventHandlers={{
                  dragend: (e) => setPosition(e.target.getLatLng()),
                }}
              />
            </MapContainer>
          </div>

          <DialogActions sx={{ justifyContent: "space-between" }}>
            <Button onClick={handleUseCurrentLocation}>Use My Current Location</Button>
            <div>
              <Button onClick={() => setOpenMap(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleConfirmLocation}>
                Confirm
              </Button>
            </div>
          </DialogActions>
        </Dialog>

        {/* Multiple Media Upload */}
        <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
          Upload Media (Multiple)
          <input
            type="file"
            name="media"
            hidden
            multiple
            accept="image/*,video/*"
            onChange={handleMediaChange}
          />
        </Button>

        {/* Show file list & previews */}
        {formData.mediaFiles.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              📄 {formData.mediaFiles.length} file(s) selected:
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(120px, 1fr))",
                gap: 2,
              }}
            >
              {formData.mediaFiles.map((file, index) => {
                const previewUrl = formData.mediaPreviews[index];
                const isImage = file.type.startsWith("image/");
                const isVideo = file.type.startsWith("video/");

                return (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "8px",
                      width: "100%",
                      maxWidth: isMobile ? "100%" : "140px",
                      mx: "auto",
                    }}
                  >
                    {/* Remove button */}
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 2,
                        right: 2,
                        background: "rgba(255,255,255,0.7)",
                        "&:hover": { background: "rgba(255,0,0,0.3)" },
                      }}
                      onClick={() => handleRemoveMedia(index)}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>

                    <Typography
                      variant="caption"
                      sx={{
                        wordBreak: "break-word",
                        textAlign: "center",
                        height: "2em",
                        overflow: "hidden",
                      }}
                    >
                      {file.name}
                    </Typography>

                    {isImage && previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: isMobile ? "160px" : "100px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    )}
                    {isVideo && previewUrl && (
                      <video
                        src={previewUrl}
                        style={{
                          width: "100%",
                          height: isMobile ? "160px" : "100px",
                          borderRadius: "6px",
                        }}
                        muted
                      />
                    )}

                    <Button
                      size="small"
                      variant="text"
                      onClick={() => window.open(previewUrl, "_blank")}
                    >
                      View
                    </Button>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
