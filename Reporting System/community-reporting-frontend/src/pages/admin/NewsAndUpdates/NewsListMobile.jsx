import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  IconButton,
  Collapse,
  Divider,
  Tooltip,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NewsListMobile({ news, setConfirmDialog }) {
  const [expanded, setExpanded] = useState([]);

  const toggleExpand = (id) =>
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  if (!news || news.length === 0) {
    return (
      <Box
        className="container"
        sx={{
          mt: 3,
          textAlign: "center",
          color: "gray",
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            bgcolor: "#1a1a1a",
            borderRadius: "12px",
            py: 4,
            px: 2,
          }}
        >
          <Typography variant="body1" sx={{ color: "gray", fontStyle: "italic" }}>
            No news found
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <div className="container mt-3">
      <div className="row gy-3">
        {news.map((n) => {
          const isExpanded = expanded.includes(n.id);
          return (
            <div className="col-12" key={n.id}>
              <Paper
                elevation={3}
                sx={{
                  bgcolor: "#1a1a1a",
                  color: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  p: 2,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.01)",
                    boxShadow: "0 0 10px rgba(255,255,0,0.3)",
                  },
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => toggleExpand(n.id)}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <Box>
                    <Typography
                      fontWeight="bold"
                      sx={{ color: "yellow", fontSize: "1rem" }}
                    >
                      {n.title}
                    </Typography>
                    <Typography
                      sx={{
                        color:
                          n.status === "Published" ? "#00e676" : "#ffb74d",
                        fontSize: "0.875rem",
                      }}
                    >
                      {n.status}
                    </Typography>
                  </Box>
                  <IconButton sx={{ color: "yellow" }}>
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>

                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.2)" }} />
                  <Typography
                    variant="body2"
                    color="gray"
                    sx={{ fontSize: "0.9rem", mb: 1 }}
                  >
                    {n.content || "No content available."}
                  </Typography>

                  <Box
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    mt={1.5}
                    className="flex-wrap"
                  >
                    <Tooltip title="Edit">
                      <IconButton sx={{ color: "orange" }}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    {n.status === "Published" ? (
                      <Tooltip title="Unpublish">
                        <IconButton
                          sx={{ color: "red" }}
                          onClick={() =>
                            setConfirmDialog({
                              open: true,
                              type: "unpublish",
                              id: n.id,
                            })
                          }
                        >
                          <UnpublishedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Publish">
                        <IconButton
                          sx={{ color: "green" }}
                          onClick={() =>
                            setConfirmDialog({
                              open: true,
                              type: "publish",
                              id: n.id,
                            })
                          }
                        >
                          <PublishIcon />
                        </IconButton>
                      </Tooltip>
                    )}

                    <Tooltip title="Delete">
                      <IconButton
                        sx={{ color: "red" }}
                        onClick={() =>
                          setConfirmDialog({
                            open: true,
                            type: "delete",
                            id: n.id,
                          })
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Collapse>
              </Paper>
            </div>
          );
        })}
      </div>
    </div>
  );
}
