import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts, DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";

import SignIn from "@screens/SignIn";

import theme from "./src/theme";

const App = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style={"light"} backgroundColor={"transparent"} translucent />
      <SignIn />
    </ThemeProvider>
  );
};

export default App;
