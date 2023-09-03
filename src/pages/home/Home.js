import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { Appbar, Avatar } from "react-native-paper";
import { ThemeContextProvider, useTheme } from "../../context/ThemeContext";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function Home() {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Home" />
        <Appbar.Action icon="calendar" onPress={() => {}}/>
        <Appbar.Action
          icon={isDarkTheme ? "moon-waning-crescent" : "white-balance-sunny"}
          onPress={toggleThemeType}
        />
      </Appbar.Header>
    </View>
  );
};