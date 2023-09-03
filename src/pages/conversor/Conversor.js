
import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
import AuthService from "../../services/auth/AuthService";

export default function Conversor({navigation}) {
    const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIslogin] = useState(false);


    const userLogin = async () => {

        let data = {
            'email': username,
            'password': password
        }

        setIslogin(true);   
       const res =  await AuthService.login(data); 

       if (res==true) {
            setIslogin(false);
            navigation.navigate('home');
       }{
           setIslogin(false);
       }

    }
    return (
        <View style={{ textAlign:'center' }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: theme.colors.primary }} onPress={toggleThemeType}>Conversao disponivel</Text>
        </View>
    );
};