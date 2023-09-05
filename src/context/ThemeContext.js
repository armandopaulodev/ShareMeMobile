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
    "primary": "rgb(19, 96, 165)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(211, 228, 255)",
    "onPrimaryContainer": "rgb(0, 28, 56)",
    "secondary": "rgb(6, 97, 164)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(210, 228, 255)",
    "onSecondaryContainer": "rgb(0, 29, 54)",
    "tertiary": "rgb(76, 87, 169)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(223, 224, 255)",
    "onTertiaryContainer": "rgb(0, 12, 97)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(253, 252, 255)",
    "onBackground": "rgb(26, 28, 30)",
    "surface": "rgb(253, 252, 255)",
    "onSurface": "rgb(26, 28, 30)",
    "surfaceVariant": "rgb(223, 226, 235)",
    "onSurfaceVariant": "rgb(67, 71, 78)",
    "outline": "rgb(115, 119, 127)",
    "outlineVariant": "rgb(195, 198, 207)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(47, 48, 51)",
    "inverseOnSurface": "rgb(241, 240, 244)",
    "inversePrimary": "rgb(162, 201, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(241, 244, 251)",
      "level2": "rgb(234, 240, 248)",
      "level3": "rgb(227, 235, 245)",
      "level4": "rgb(225, 233, 244)",
      "level5": "rgb(220, 230, 242)"
    },
    "surfaceDisabled": "rgba(26, 28, 30, 0.12)",
    "onSurfaceDisabled": "rgba(26, 28, 30, 0.38)",
    "backdrop": "rgba(44, 49, 55, 0.4)"
  }
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
