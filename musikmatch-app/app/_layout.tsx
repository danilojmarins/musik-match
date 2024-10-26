import theme from "@/styles/theme";
import { Slot, SplashScreen, Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import { SessionProvider } from "@/context/SessionContext";

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
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <Slot />
      </ThemeProvider>
    </SessionProvider>
  );
}
