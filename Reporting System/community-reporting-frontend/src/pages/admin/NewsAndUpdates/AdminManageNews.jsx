// src/pages/NewsAndUpdates/AdminManageNews.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  fetchAllNews,
  publishNews,
  unpublishNews,
  deleteNews,
} from "../../../api/newsApi";
import NewsTable from "./NewsTable";
import NewsListMobile from "./NewsListMobile";
import NewsEditorDialog from "./NewsEditorDialog";
import ConfirmationDialog from "./ConfirmationDialog";
import SnackbarAlert from "../../../common/SnackbarAlert";

export default function AdminManageNews() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editorOpen, setEditorOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: null,
    id: null,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setPage(0);
  }, [search, filter]);


  const previousIdsRef = useRef([]);

  // 🔁 Fetch News
  useEffect(() => {
    const getNews = async () => {
      try {
        const res = await fetchAllNews();
        const sorted = Array.isArray(res.data)
          ? res.data.sort((a, b) => (a.status === "Published" ? -1 : 1))
          : [];
        const ids = sorted.map((n) => n.id);
        if (
          previousIdsRef.current.length > 0 &&
          ids.some((id) => !previousIdsRef.current.includes(id))
        ) {
          setSnackbar({
            open: true,
            message: "New news item added!",
            severity: "info",
          });
        }
        previousIdsRef.current = ids;
        setNews(sorted);
      } catch (err) {
        console.error(err);
      }
    };

    getNews();
    const interval = setInterval(getNews, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🧮 Filter logic
  const filteredNews = Array.isArray(news)
    ? news.filter((n) => {
        const matchSearch =
          n.title?.toLowerCase().includes(search.toLowerCase()) ||
          n.content?.toLowerCase().includes(search.toLowerCase());
        const matchFilter =
          filter === "All" || n.status.toLowerCase() === filter.toLowerCase();
        return matchSearch && matchFilter;
      })
    : [];

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredNews.length / rowsPerPage);
  const paginatedNews = filteredNews.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // 🟢 Confirm actions
  const handleActionConfirm = async () => {
    const { type, id } = confirmDialog;
    try {
      if (type === "publish") await publishNews(id);
      else if (type === "unpublish") await unpublishNews(id);
      else if (type === "delete") await deleteNews(id);

      setNews((prev) =>
        type === "delete"
          ? prev.filter((n) => n.id !== id)
          : prev.map((n) =>
              n.id === id
                ? { ...n, status: type === "publish" ? "Published" : "Unpublished" }
                : n
            )
      );

      setSnackbar({
        open: true,
        message:
          type === "publish"
            ? "News published successfully!"
            : type === "unpublish"
            ? "News unpublished successfully!"
            : "News deleted successfully!",
        severity: type === "delete" ? "warning" : "success",
      });
    } catch (err) {
      console.error(err);
    }
    setConfirmDialog({ open: false, type: null, id: null });
  };

  return (
    <Box sx={{ bgcolor: "#0D0D0D", minHeight: "100vh", py: 3 }}>
      <Container maxWidth="lg" sx={{ mt: 3, mb: 4, flex: 1 }}>
        {/* 🔹 Header */}
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: "16px",
            bgcolor: "black",
            color: "white",
            position: "relative",
          }}
        >
          {isMobile && (
            <IconButton
              onClick={() => navigate("/admin/admin-home")}
              sx={{
                position: "absolute",
                top: "50%",
                left: 12,
                transform: "translateY(-50%)",
                color: "yellow",
                bgcolor: "black",
                border: "1px solid yellow",
                "&:hover": { bgcolor: "#222" },
                zIndex: 2,
              }}
              size="small"
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
          )}

          <Box
            display="flex"
            alignItems="center"
            justifyContent={isMobile ? "center" : "space-between"}
            flexWrap="wrap"
            gap={1}
            sx={{
              position: "relative",
              ...(isMobile && { pl: 5 }),
            }}
          >
            {!isMobile && (
              <Button
                startIcon={<ArrowBackIcon />}
                variant="outlined"
                size="medium"
                sx={{
                  color: "yellow",
                  borderColor: "yellow",
                  "&:hover": { borderColor: "white", color: "white" },
                }}
                onClick={() => navigate("/admin/admin-home")}
              >
                Back
              </Button>
            )}
            <Typography
              variant={isMobile ? "h6" : "h5"}
              fontWeight="bold"
              sx={{
                color: "yellow",
                textAlign: isMobile ? "center" : "right",
                width: isMobile ? "100%" : "auto",
                letterSpacing: "0.5px",
              }}
            >
              Manage News & Updates
            </Typography>
          </Box>
        </Paper>

        {/* 🔸 Filters + Add Button */}
        <Paper
          elevation={2}
          sx={{
            p: 2,
            mt: 3,
            borderRadius: "12px",
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            label="Search News"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1, minWidth: 220 }}
          />
          <TextField
            label="Filter by Status"
            select
            variant="outlined"
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ width: 200 }}
          >
            {["All", "Published", "Unpublished"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "yellow",
              color: "black",
              "&:hover": { bgcolor: "#f9ff50" },
              fontWeight: "bold",
            }}
            onClick={() => setEditorOpen(true)}
          >
            Add News
          </Button>
        </Paper>

        {/* 🧾 News Table / Mobile List */}
        <Box sx={{ mt: 3 }}>
          {isMobile ? (
            <NewsListMobile news={paginatedNews} setConfirmDialog={setConfirmDialog} />
          ) : (
            <NewsTable news={paginatedNews} setConfirmDialog={setConfirmDialog} />
          )}
        </Box>

        {/* 🔘 Custom Pagination Bar (always visible) */}
        {/* 🔘 Custom Pagination Bar */}
        <Box
            sx={{
                bgcolor: "black",
                color: "yellow",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: isMobile ? "center" : "flex-end",
                alignItems: "center",
                px: isMobile ? 2 : 3,
                py: isMobile ? 2 : 1,
                gap: isMobile ? 1.5 : 2,
                flexWrap: "wrap",
                borderRadius: "0 0 12px 12px",
                mt: 2,
        }}
        >
        {/* Rows per page (hide label on mobile to save space) */}
        {!isMobile && (
            <Typography variant="body2" sx={{ color: "yellow" }}>
            Rows per page:
            </Typography>
        )}

        <TextField
            select
            value={rowsPerPage}
            onChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
            }}
            variant="outlined"
            size="small"
            sx={{
            width: isMobile ? 90 : 70,
            "& .MuiSelect-select": {
                color: "yellow",
                py: "4px",
            },
            "& fieldset": {
                borderColor: "yellow",
            },
            "&:hover fieldset": {
                borderColor: "white",
            },
            "& svg": {
                color: "yellow",
            },
            }}
        >
            {[5, 10, 25, 50].map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
            ))}
        </TextField>

        <Typography
            variant="body2"
            sx={{
            color: "yellow",
            mx: isMobile ? 0 : 2,
            textAlign: isMobile ? "center" : "left",
            }}
        >
            {filteredNews.length === 0
            ? "0–0 of 0"
            : `${page * rowsPerPage + 1}-${Math.min(
                (page + 1) * rowsPerPage,
                filteredNews.length
                )} of ${filteredNews.length}`}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                sx={{
                    minWidth: "auto",
                    color: "yellow",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": { color: "white", background: "transparent" },
                }}
                >
                {"<"}
                </Button>

                <Button
                onClick={() =>
                    setPage(
                    Math.min(
                        Math.ceil(filteredNews.length / rowsPerPage) - 1,
                        page + 1
                    )
                    )
                }
                disabled={page >= Math.ceil(filteredNews.length / rowsPerPage) - 1}
                sx={{
                    minWidth: "auto",
                    color: "yellow",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": { color: "white", background: "transparent" },
                }}
                >
                {">"}
                </Button>

        </Box>
        </Box>


        {/* 🪟 Dialogs & Snackbar */}
        <NewsEditorDialog open={editorOpen} onClose={() => setEditorOpen(false)} />
        <ConfirmationDialog
          open={confirmDialog.open}
          type={confirmDialog.type}
          onClose={() => setConfirmDialog({ open: false })}
          onConfirm={handleActionConfirm}
        />
        <SnackbarAlert
          {...snackbar}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        />
      </Container>
    </Box>
  );
}
