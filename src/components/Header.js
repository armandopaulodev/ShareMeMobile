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
    <Appbar.Header style={{ backgroundColor: isDarkTheme? '':'#f87171' }}>
      {title!=='ShareMe' && back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} color="white"/>
      {
        !back? (
          <Appbar.Action 
          icon={isDarkTheme ? "moon-waning-crescent" : "white-balance-sunny"}
          iconColor="white"
          onPress={toggleThemeType}
        />
        ) : null
      }     
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
            color="white"
              icon="dots-vertical"
              onPress={openMenu}
            />
          }>
          <Menu.Item
            onPress={() => {
              console.log('Option 1 was pressed');
            }}
            title="Nome aqui"
          />
          <Menu.Item
            onPress={() => {
              toggleThemeType()
            }}
            title="Alterar modo"
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

