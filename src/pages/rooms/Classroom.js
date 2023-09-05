
import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";

export default function Classroom({navigation}) {
    const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();
 
    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 35, top:-50 }}>
            <Button mode="contained">
                Carregar documento (.docx)
            </Button>
        </View>
    );
};