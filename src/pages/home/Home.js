import React from "react";
import { View } from "react-native";
import { Appbar, Avatar, Button } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function Home({navigation}) {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();

  return (
    <View>
      <Button mode="elevated" onPress={()=>{
        navigation.navigate('login')
      }}>Login</Button>
    </View>
  );
};