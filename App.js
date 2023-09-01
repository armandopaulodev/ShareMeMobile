import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { Appbar, Avatar } from "react-native-paper";
import { ThemeContextProvider, useTheme } from "./src/context/ThemeContext";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const TestScreen = () => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();

  return (
    <View>
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={() => {}} /> */}
        <Appbar.Content title="ShareMe" />
        <Appbar.Action icon="calendar" onPress={() => {}} />
        <Appbar.Action
          icon={isDarkTheme ? "moon-waning-crescent" : "white-balance-sunny"}
          onPress={toggleThemeType}
        />
      </Appbar.Header>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeContextProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Test"
          component={TestScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </ThemeContextProvider>
  );
};

export default App;
