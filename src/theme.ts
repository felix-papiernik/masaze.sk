'use client';
import { createTheme, hexToRgb } from '@mui/material/styles';

const richBlack = "#0C1618";
//farebna paleta https://coolors.co/407899-faf4d3-ff595e-020300-36311f

const theme = createTheme({
    palette: {
        primary: {
            main: "#407899", // Cererulean šedá pre neutrálny vzhľad
            contrastText: "#ffffff", // Biela pre text na tlačidlách
        },
        secondary: {
            //main: "#B7990D", // Satin sheen gold šedá pre doplnkové prvky
            main: "#FAF4D3", // Cornsilk sheen gold šedá pre doplnkové prvky
        },
    },
    typography: {
        h1: {
            fontSize: "3rem",
            fontWeight: 700,
            lineHeight: 1.2,
            color: richBlack,
        },
        h2: {
            fontSize: "2.5rem",
            fontWeight: 600,
            lineHeight: 1.3,
            color: richBlack,
        },
        h3: {
            fontSize: "2rem",
            fontWeight: 500,
            lineHeight: 1.4,
            color: richBlack,
        },
        h4: {
            fontSize: "1.75rem",
            fontWeight: 500,
            lineHeight: 1.5,
            color: richBlack,
        },
        h5: {
            fontSize: "1.5rem",
            fontWeight: 400,
            lineHeight: 1.6,
            color: richBlack,
        },
        h6: {
            fontSize: "1.25rem",
            fontWeight: 400,
            lineHeight: 1.7,
            color: richBlack,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderWidth: 1,
                },
            },
        },
    },
});

export default theme;
