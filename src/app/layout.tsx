import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Box, Stack, ThemeProvider } from "@mui/material";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { getAuthFromCookies } from "@/lib/actions";
import theme from "@/theme";
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: "Čítaj knihy",
  description: "Semestrálny projekt",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ height: "100%", margin: 0 }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Stack direction={"column"} minHeight={"100vh"} width={"100%"}>
              <Header />
              <Box component="main" sx={{ flexGrow: 1, padding: 2, minHeight: "100%", width: "100%", boxSizing: "border-box", display: "flex", flexWrap: "nowrap" }}>
                {children}
              </Box>
              <Footer />
            </Stack>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
