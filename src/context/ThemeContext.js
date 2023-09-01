import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import {
  Provider as PaperProvider,
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

const lightTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors:{
    "primary": "rgb(0, 103, 131)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(188, 233, 255)",
    "onPrimaryContainer": "rgb(0, 31, 42)",
    "secondary": "rgb(0, 104, 116)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(151, 240, 255)",
    "onSecondaryContainer": "rgb(0, 31, 36)",
    "tertiary": "rgb(140, 51, 179)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(248, 216, 255)",
    "onTertiaryContainer": "rgb(50, 0, 71)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(251, 252, 254)",
    "onBackground": "rgb(25, 28, 30)",
    "surface": "rgb(251, 252, 254)",
    "onSurface": "rgb(25, 28, 30)",
    "surfaceVariant": "rgb(220, 228, 233)",
    "onSurfaceVariant": "rgb(64, 72, 76)",
    "outline": "rgb(112, 120, 125)",
    "outlineVariant": "rgb(192, 200, 205)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(46, 49, 50)",
    "inverseOnSurface": "rgb(239, 241, 243)",
    "inversePrimary": "rgb(99, 211, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(238, 245, 248)",
      "level2": "rgb(231, 240, 244)",
      "level3": "rgb(223, 236, 241)",
      "level4": "rgb(221, 234, 239)",
      "level5": "rgb(216, 231, 237)"
    },
    "surfaceDisabled": "rgba(25, 28, 30, 0.12)",
    "onSurfaceDisabled": "rgba(25, 28, 30, 0.38)",
    "backdrop": "rgba(42, 50, 53, 0.4)"
  },
};

const darkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    "primary": "rgb(99, 211, 255)",
    "onPrimary": "rgb(0, 53, 69)",
    "primaryContainer": "rgb(0, 77, 99)",
    "onPrimaryContainer": "rgb(188, 233, 255)",
    "secondary": "rgb(79, 216, 235)",
    "onSecondary": "rgb(0, 54, 61)",
    "secondaryContainer": "rgb(0, 79, 88)",
    "onSecondaryContainer": "rgb(151, 240, 255)",
    "tertiary": "rgb(235, 178, 255)",
    "onTertiary": "rgb(82, 0, 113)",
    "tertiaryContainer": "rgb(114, 17, 153)",
    "onTertiaryContainer": "rgb(248, 216, 255)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(25, 28, 30)",
    "onBackground": "rgb(225, 226, 228)",
    "surface": "rgb(25, 28, 30)",
    "onSurface": "rgb(225, 226, 228)",
    "surfaceVariant": "rgb(64, 72, 76)",
    "onSurfaceVariant": "rgb(192, 200, 205)",
    "outline": "rgb(138, 146, 151)",
    "outlineVariant": "rgb(64, 72, 76)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(225, 226, 228)",
    "inverseOnSurface": "rgb(46, 49, 50)",
    "inversePrimary": "rgb(0, 103, 131)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(29, 37, 41)",
      "level2": "rgb(31, 43, 48)",
      "level3": "rgb(33, 48, 55)",
      "level4": "rgb(34, 50, 57)",
      "level5": "rgb(35, 54, 62)"
    },
    "surfaceDisabled": "rgba(225, 226, 228, 0.12)",
    "onSurfaceDisabled": "rgba(225, 226, 228, 0.38)",
    "backdrop": "rgba(42, 50, 53, 0.4)"
  },
};

export const ThemeContext = React.createContext({
  theme: lightTheme,
  themeType: 'light',
  isDarkTheme: false,
  setThemeType: () => {},
  toggleThemeType: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [themeType, setThemeType] = useState(colorScheme || 'light');

  const toggleThemeType = useCallback(() => {
    setThemeType((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const isDarkTheme = useMemo(() => themeType === 'dark', [themeType]);
  const theme = useMemo(() => (isDarkTheme ? darkTheme : lightTheme), [
    isDarkTheme,
  ]);

  return (
    <NavigationContainer theme={theme}>
      <PaperProvider theme={theme}>
        <ThemeContext.Provider
          value={{
            theme,
            themeType,
            isDarkTheme,
            setThemeType,
            toggleThemeType,
          }}
        >
          {children}
        </ThemeContext.Provider>
      </PaperProvider>
    </NavigationContainer>
  );
};
