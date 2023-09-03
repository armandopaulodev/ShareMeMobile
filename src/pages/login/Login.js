import React from "react";
import { View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { ThemeContextProvider, useTheme } from "../../context/ThemeContext";

export default function Login() {
    const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 25, top: -100 }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }} onPress={toggleThemeType}>Bem Vindo Ao ShareMe</Text>

            <TextInput
                label="Email"
                mode="outlined"
                style={{ marginTop: 14 }}
            />
            <TextInput
                style={{ marginTop: 14 }}
                maxLength={8}
                editable
                label="Password"
                mode="outlined"
                placeholder="*********"
            />

            <Button onPress={()=>{console.log('PressIn')}} mode={isDarkTheme? 'contained-tonal': 'elevated'} style={{ marginTop: 20 }} icon={'arrow-right-bold-box'}>
                Entrar
            </Button>


        </View>
    );
};