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

export default function ReportForm({ open, handleClose, handleSubmit }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    location: "",
    mediaFiles: [],
    mediaPreviews: [],
  });

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

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
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
          <MenuItem value="Garbage">Garbage</MenuItem>
          <MenuItem value="Road">Road</MenuItem>
          <MenuItem value="Safety">Safety</MenuItem>
        </TextField>
        <TextField
          margin="dense"
          label="Priority Level"
          name="priority"
          fullWidth
          select
          value={formData.priority}
          onChange={handleChange}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>
        <TextField
          margin="dense"
          label="Location"
          name="location"
          fullWidth
          value={formData.location}
          onChange={handleChange}
        />

        {/* 📁 Multiple Media Upload */}
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
                    {/* ❌ Remove button */}
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

                    {/* Image or Video Preview */}
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

                    {/* View Button */}
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
