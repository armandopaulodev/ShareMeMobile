import "react-native-gesture-handler";
import React from "react";
import { ThemeContextProvider } from "./src/context/ThemeContext";
import RouteServiceProvider from "./src/route/RouteServiceProvider";

const App = () => {
  return (
    <ThemeContextProvider>
        <RouteServiceProvider/>
    </ThemeContextProvider>
  );
};

export default App;
