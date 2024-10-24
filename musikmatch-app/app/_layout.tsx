import theme from "@/styles/theme";
import { SplashScreen, Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import Login from "./login";
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import Register from "./register";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    'Jaro-Regular': require('../assets/fonts/Jaro-Regular.ttf')
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
        <Register />
    </ThemeProvider>
  );
}
