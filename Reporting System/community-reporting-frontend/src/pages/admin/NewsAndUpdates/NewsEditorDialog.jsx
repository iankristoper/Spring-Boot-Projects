import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button,
} from "@mui/material";
import { createNews, updateNews } from "../../../api/newsApi";

export default function NewsEditorDialog({ open, onClose, newsItem }) {
  const [form, setForm] = useState(newsItem || { title: "", content: "" });

  const handleSave = async () => {
    try {
      if (newsItem) await updateNews(newsItem.id, form);
      else await createNews(form);
      onClose(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle sx={{ bgcolor: "black", color: "yellow" }}>
        {newsItem ? "Edit News" : "Add News"}
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "#111" }}>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          sx={{ mt: 2, bgcolor: "white" }}
        />
        <TextField
          fullWidth
          label="Content"
          multiline
          rows={4}
          variant="outlined"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          sx={{ mt: 2, bgcolor: "white" }}
        />
      </DialogContent>
      <DialogActions sx={{ bgcolor: "black" }}>
        <Button onClick={() => onClose(false)} sx={{ color: "yellow" }}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} sx={{ bgcolor: "yellow", color: "black" }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
