import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function NewsTable({ news, setConfirmDialog }) {
  const hasNews = news && news.length > 0;

  return (
    <TableContainer component={Paper} sx={{ mt: 3, bgcolor: "#1a1a1a", borderRadius: "12px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "yellow", fontWeight: "bold", bgcolor: "#000000ff"}}>Title</TableCell>
            <TableCell sx={{ color: "yellow", fontWeight: "bold", bgcolor: "#000000ff" }}>Status</TableCell>
            <TableCell align="center" sx={{ color: "yellow", fontWeight: "bold", bgcolor: "#000000ff" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {hasNews ? (
            news.map((n) => (
              <TableRow key={n.id} hover>
                <TableCell sx={{ color: "white" }}>{n.title}</TableCell>
                <TableCell
                  sx={{
                    color: n.status === "Published" ? "#00e676" : "#ffb74d",
                    fontWeight: 500,
                  }}
                >
                  {n.status}
                </TableCell>
                <TableCell align="center">
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
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>
                <Box
                  sx={{
                    py: 4,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "gray",
                  }}
                >
                  <Typography variant="body1" sx={{ color: "gray" }}> {/** , fontStyle: "italic"*/}
                    No news found
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
