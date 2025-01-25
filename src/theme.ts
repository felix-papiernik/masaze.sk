'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
        main: "#6c757d", // Jemná šedá pre neutrálny vzhľad
        contrastText: "#ffffff", // Biela pre text na tlačidlách
      },
      secondary: {
        main: "#adb5bd", // Svetlejšia šedá pre doplnkové prvky
      },
  },
  typography: {
    h1: {
      fontSize: "3rem", 
      fontWeight: 700,
      lineHeight: 1.2,
      color: "#333333",
    },
    h2: {
      fontSize: "5rem", 
      fontWeight: 600,
      lineHeight: 1.3,
      color: "#444444",
    },
    h3: {
      fontSize: "2rem", 
      fontWeight: 500,
      lineHeight: 1.4,
      color: "#555555",
    },
    h4: {
      fontSize: "1.75rem",
      fontWeight: 500,
      lineHeight: 1.5,
      color: "#666666",
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 400,
      lineHeight: 1.6,
      color: "#777777",
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 400,
      lineHeight: 1.7,
      color: "#888888",
    },
  },
});

export default theme;
