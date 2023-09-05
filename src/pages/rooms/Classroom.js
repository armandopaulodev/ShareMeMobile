
import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
import * as Animatable from 'react-native-animatable';

export default function Classroom({navigation}) {
    const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();
 
    return (
        <View style={{ justifyContent: 'center', padding: 35 }}>
           
            <Animatable.View animation='slideInLeft' easing={'ease-in-out-quad'} iterationCount={3} direction="alternate">
            <Button mode="contained" icon={'account-group'} style={{ padding:10 }}>
                Carregar documento (.docx)
            </Button>
            </Animatable.View>

        </View>
    );
};