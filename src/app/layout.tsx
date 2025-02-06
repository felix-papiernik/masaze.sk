import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Box, Stack, ThemeProvider } from "@mui/material";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { getAuthFromCookies } from "@/lib/actions";
import { AuthProvider } from "@/context/AuthContext";
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
  //context neprezije pri refreshi stranky,
  //takze nacitam pouzivatela z cookies
  let initialAuth = await getAuthFromCookies();

  //console.log("root layout initialAuth: ", initialAuth);

  return (
    <html lang="en">
      <body style={{ height: "100%", margin: 0 }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AuthProvider initialAuth={initialAuth}>
              <Stack direction={"column"} minHeight={"100vh"} width={"100%"}>
                <Header />
                <Box component="main" sx={{ flexGrow: 1, padding: 2, minHeight: "100%", width: "100%", boxSizing: "border-box", display: "flex", flexWrap: "nowrap" }}>
                  {children}
                </Box>
                <Footer />
              </Stack>
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
