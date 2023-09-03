
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Card, Text, TextInput, ActivityIndicator } from "react-native-paper";
import { ThemeContextProvider, useTheme } from "../../context/ThemeContext";
import { Plane, Swing } from 'react-native-animated-spinkit'
import AuthService from "../../services/auth/AuthService";

export default function Login({navigation}) {
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

       console.log(res);
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 35, top:-50 }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: theme.colors.primary }} onPress={toggleThemeType}>Bem Vindo Ao ShareMe</Text>
            <TextInput
                label="Email"
                mode="outlined"
                style={{ marginTop: 14 }}
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                style={{ marginTop: 14 }}
                maxLength={8}
                editable
                label="Password"
                mode="outlined"
                placeholder="*********"
                onChangeText={text => setPassword(text)}
            />
            <Button disabled={isLogin ? true : false} onPress={() => userLogin()} mode={isDarkTheme ? 'contained-tonal' : 'elevated'} style={{ marginTop: 20 }} icon={'arrow-right-bold-box'}>
                Entrar
            </Button>

            {
                isLogin ?
                    <View style={{ textAlign: 'center' }}>
                        <Text style={{ textAlign: 'center', marginTop: 100 }} onPress={toggleThemeType}>
                            <Swing size={48} color={theme.colors.primary} />
                        </Text>
                    </View> : ''
            }
        </View>
    );
};