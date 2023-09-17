import React from "react";
import { Appbar, Avatar, Menu, Text, Button, Divider } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";
import { getHeaderTitle } from '@react-navigation/elements';
import AuthService from "../services/auth/AuthService";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from "react-native";


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
    <View>
      <Appbar.Header>
      { back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={<Text style={{ fontWeight:'bold', fontSize:30 }}>{title}</Text>}/>
      {
        !back? (
         <View style={{ paddingRight: 10, border: 1, borderColor:'red', borderRadius:50 }}>
           <Ionicons name={'person-outline'} size={30} />
         </View>
        ) : null
      }    
    </Appbar.Header>
    <Divider/>
    </View>
  );
};

