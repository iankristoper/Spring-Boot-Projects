import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // Dark mode as base
    primary: {
      main: "#FFD700", // Yellow
    },
    secondary: {
      main: "#FFFFFF", // White
    },
    background: {
      default: "#121212", // Dark background
      paper: "#1E1E1E",   // Slightly lighter for cards
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h3: { fontWeight: 600 },
    h4: { fontWeight: 500 },
  },
});

export default theme;
