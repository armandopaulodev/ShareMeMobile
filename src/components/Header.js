import React from "react";
import { Appbar, Avatar, Menu, Text, Button } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";
import { getHeaderTitle } from '@react-navigation/elements';
import AuthService from "../services/auth/AuthService";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function Header({ navigation, route, options, back }) {

  const title = getHeaderTitle(options, route.name);
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();

  const logout = async () =>{
    await AuthService.clearAuthToken().then((res)=>{
       setVisible(false)
       navigation.navigate('out');
    });
  }

  return (
    <Appbar.Header>
      {title!=='ShareMe' && back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {
        !back? (
          <Appbar.Action
          icon={isDarkTheme ? "moon-waning-crescent" : "white-balance-sunny"}
          onPress={toggleThemeType}
        />
        ) : null
      }     
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={openMenu}
            />
          }>
          <Menu.Item
            onPress={() => {
              console.log('Option 1 was pressed');
            }}
            title="Option 1"
          />
          <Menu.Item
            onPress={() => {
              console.log('Option 2 was pressed');
            }}
            title="Option 2"
          />
          <Menu.Item
            onPress={() => {
              logout()
            }}
            title={<Button icon="exit-to-app">Sair</Button>}
          />
        </Menu>

    
    </Appbar.Header>
  );
};

