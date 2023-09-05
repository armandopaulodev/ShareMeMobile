
import React, { useState } from "react";
import { View, Image } from "react-native";
import { Button, Card, Text, TextInput, ActivityIndicator } from "react-native-paper";
import { ThemeContextProvider, useTheme } from "../../context/ThemeContext";
import { Plane, Swing } from 'react-native-animated-spinkit'
import AuthService from "../../services/auth/AuthService";
import * as Animatable from 'react-native-animatable';

export default function Tempfile({ navigation }) {
    const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIslogin] = useState(false);
    const [converting, setConverting] = useState(false);


    const userLogin = async () => {

        let data = {
            'email': username,
            'password': password
        }

        setIslogin(true);
        const res = await AuthService.login(data);

        if (res == true) {
            setIslogin(false);
            navigation.navigate('ShareMe');
        } {
            setIslogin(false);
        }

    }
    return (
        <View style={{ justifyContent: 'center', padding: 35, backgroundColor:'white' }}>
            <Animatable.View animation='bounceIn' easing={'ease-in-out-quad'} iterationCount={3} direction="alternate">
                <Button icon={{ source: "autorenew", direction: 'rtl' }} disabled={converting ? true : false} mode="contained" onPress={() => pickDocument()} style={{ padding: 10, backgroundColor: '#f472b6' }}>
                    Carregar Ficheiro
                </Button>
            </Animatable.View>
            <Animatable.View animation='pulse' easing={'ease-in-out-quad'} iterationCount={2} direction="alternate">
                <Image
                    source={require('../../../assets/photos/temp.jpg')}
                    style={{ width: 400, height: 400, alignSelf: 'center', top: 70 }}
                />
            </Animatable.View>

          
        </View>
    );
};