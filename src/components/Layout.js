import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { Stack, Container, Box } from "@mui/material";
import AppAppBar from "@/components/AppAppBar";
import getMPTheme from "@/theme/getMPTheme";

export default function Layout({ children }) {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const MPTheme = createTheme(getMPTheme("light"));
  const defaultTheme = createTheme({ palette: { mode } });

  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    // localStorage.setItem("themeMode", newMode);
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? MPTheme : defaultTheme}>
      <title>Quotation Platform</title>
      <CssBaseline enableColorScheme />
      <AppAppBar />

      <Box>
        <Box
          id="hero"
          sx={(theme) => ({
            width: "100%",
            backgroundSize: "100% 20%",
            backgroundRepeat: "no-repeat",
            // py: 8,
            pt: 10,
          })}
        >
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: { xs: 2, sm: 2 },
              pb: { xs: 8, sm: 8 },
            }}
          >
            <Stack
              spacing={2}
              useFlexGap
              sx={{
                width: {
                  xs: "100%",
                  sm: "100%",
                  md: "100%",
                  lg: "100%",
                  xl: "100%",
                },
              }}
            >
              {children}
            </Stack>
          </Container>
        </Box>
        {/* <Footer /> */}
      </Box>
    </ThemeProvider>
  );
}
