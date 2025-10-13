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
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MapboxLocationPicker from "../components/MapboxLocationPicker";
import { Snackbar, Alert } from "@mui/material";









export default function EditReportForm({ open, handleClose, reportData, handleUpdate }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [successDialog, setSuccessDialog] = useState(false);



  // Form state
  const [formData, setFormData] = useState({
    title: reportData?.title || "",
    description: reportData?.description || "",
    category: reportData?.category || "",
    priority: reportData?.priority || "",
    location: reportData?.location || "",
    mediaFiles: [],
    mediaPreviews: [],
  });

  const [openMap, setOpenMap] = useState(false);

  // Priority confirmation dialog
  const [priorityDialog, setPriorityDialog] = useState({
    open: false,
    message: "",
    newValue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Priority confirmation
  const handlePriorityChange = (e) => {
    const newPriority = e.target.value;
    setPriorityDialog({
      open: true,
      message: `Are you sure you want to set priority to "${newPriority}"?`,
      newValue: newPriority,
    });
  };

  const confirmPriority = () => {
    setFormData((prev) => ({ ...prev, priority: priorityDialog.newValue }));
    setPriorityDialog({ open: false, message: "", newValue: "" });
  };

  const cancelPriority = () => {
    setPriorityDialog({ open: false, message: "", newValue: "" });
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      mediaFiles: files,
      mediaPreviews: previews,
    }));
  };

  const handleRemoveMedia = (index) => {
    setFormData((prev) => {
      const newFiles = [...prev.mediaFiles];
      const newPreviews = [...prev.mediaPreviews];
      newFiles.splice(index, 1);
      newPreviews.splice(index, 1);
      return { ...prev, mediaFiles: newFiles, mediaPreviews: newPreviews };
    });
  };

  const onSubmit = () => {
    const mergedData = { ...reportData, ...formData, id: reportData.id };

    handleUpdate(mergedData);

    // Show popup instead of snackbar
    setSuccessDialog(true);

    // Delay closing the edit form
    setTimeout(() => {
      handleClose();
    }, 1500);
  };



  React.useEffect(() => {
    if (reportData) {
      setFormData({
        title: reportData.title || "",
        description: reportData.description || "",
        category: reportData.category || "",
        priority: reportData.priority || "",
        location: reportData.location || "",
        mediaFiles: [],
        mediaPreviews: [],
      });
    }
  }, [reportData]);


  return (
    <>
      {/* Priority Confirmation */}
      <Dialog open={priorityDialog.open} onClose={cancelPriority} fullWidth maxWidth="xs">
        <DialogTitle>Confirm Priority Level</DialogTitle>
        <DialogContent>
          <Typography>{priorityDialog.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelPriority}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={confirmPriority}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Report Form */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Report</DialogTitle>

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

          {/* 📍 Location */}
          <TextField
            label="Location"
            name="location"
            fullWidth
            margin="dense"
            value={formData.location}
            InputProps={{ readOnly: true }}
          />

          <Button
            variant="outlined"
            onClick={() => setOpenMap(true)}
            sx={{ mt: 1, mb: 2 }}
          >
            Update Location
          </Button>

          {openMap && (
            <MapboxLocationPicker
              onSelect={(loc) =>
                setFormData({
                  ...formData,
                  location: `${loc.address} (${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)})`,
                })
              }
              onClose={() => setOpenMap(false)}
            />
          )}

          {/* 🖼️ Media Upload */}
          <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
            Update Media (Optional)
            <input
              type="file"
              hidden
              multiple
              accept="image/*,video/*"
              onChange={handleMediaChange}
            />
          </Button>

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

        {/* ✅ Better Mobile-Friendly Actions */}
        <DialogActions sx={{ px: 3, pb: 2 }}>
        <Stack
            direction={isMobile ? "column" : "row"}
            spacing={isMobile ? 1.5 : 2}
            sx={{
            width: "100%",
            justifyContent: isMobile ? "center" : "flex-end",
            alignItems: isMobile ? "stretch" : "center",
            }}
        >
            <Button
            onClick={handleClose}
            variant={isMobile ? "outlined" : "text"}
            fullWidth={isMobile}
            >
            Cancel
            </Button>
            <Button
            variant="contained"
            onClick={onSubmit}
            fullWidth={isMobile}
            >
            Save Changes
            </Button>
        </Stack>
        </DialogActions>


        {/* Snackbar Alert 
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
        */}

      </Dialog>

      {/*  Themed Success Popup Alert */}
      <Dialog
        open={successDialog}
        onClose={() => setSuccessDialog(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            bgcolor: "#111", // black background
            color: "#FFFF00", // yellow text
            borderRadius: 3,
            textAlign: "center",
            p: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            color: "#FFFF00",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            fontSize: "1.2rem",
          }}
        >
            Report Updated
        </DialogTitle>

        <DialogContent sx={{ pb: 2 }}>
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              mt: 1,
              fontSize: "0.95rem",
            }}
          >
            The report has been successfully updated.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={() => setSuccessDialog(false)}
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 4,
              fontWeight: "bold",
              backgroundColor: "#FFFF00",
              color: "#000",
              boxShadow: "0 0 10px rgba(255, 215, 0, 0.3)",
              "&:hover": {
                backgroundColor: "#FFFF00",
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>



    </>
  );
}
