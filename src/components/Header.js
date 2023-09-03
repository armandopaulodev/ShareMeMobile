import React from "react";
import { Appbar, Avatar } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";
import { getHeaderTitle } from '@react-navigation/elements';
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function Header({ navigation, route, options, back }) {

  const title = getHeaderTitle(options, route.name);
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();

  return (
      <Appbar.Header>
        <Appbar.Content title={title} />
        <Appbar.Action icon="calendar" onPress={() => {}}/>
        <Appbar.Action
          icon={isDarkTheme ? "moon-waning-crescent" : "white-balance-sunny"}
          onPress={toggleThemeType}
        />
      </Appbar.Header>
  );
};