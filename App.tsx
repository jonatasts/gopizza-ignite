import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts, DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import { ThemeProvider } from "styled-components";

import theme from "./src/theme";

const App = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <ThemeProvider theme={theme}></ThemeProvider>;
};

export default App;
