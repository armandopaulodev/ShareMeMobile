
import React from "react";
import { View, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
import * as Animatable from 'react-native-animatable';


export default function Classroom({ navigation }) {
    const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();

    return (
        <View style={{ justifyContent: 'center', padding: 35 }}>

            <Animatable.View animation='bounceIn' easing={'ease-in-out-quad'} iterationCount={3} direction="alternate">
                <Button mode="contained" icon={'account-group'} style={{ padding: 10 }}>
                    Crie Grupo de Compartilhamento
                </Button>
            </Animatable.View>



            <Animatable.View animation='pulse' easing={'ease-in-out-quad'} iterationCount={2} direction="alternate">
                <Image
                    source={require('../../../assets/photos/empty.jpg')}
                    style={{ width: 400, height: 400, alignSelf: 'center', top: 70 }}
                />
            </Animatable.View>


        </View>
    );
};