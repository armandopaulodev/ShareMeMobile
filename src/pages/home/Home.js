import React from "react";
import { View } from "react-native";
import { Appbar, Avatar, Button } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
import AuthService from "../../services/auth/AuthService";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function Home({navigation}) {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();

  return (
    <View>
      <Button mode="elevated" onPress={()=>{
        AuthService.getAuthToken();
      }}>Login</Button>
    </View>
  );
};