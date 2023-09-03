
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
import AuthService from "../../services/auth/AuthService";
import * as DocumentPicker from 'expo-document-picker';
import { Wave } from 'react-native-animated-spinkit'

export default function Conversor({ navigation }) {
    const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();
    const [pickedDocument, setPickedDocument] = useState(null);
    const [converting, setConverting]=useState(false);

    const pickDocument = async () => {

        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*', // You can specify the MIME type or use '*' to allow any file type.
            });
            if (result.canceled === false) {
                setPickedDocument(result.assets[0]);
            } else {
                console.log('Document picking canceled.');
            }
        } catch (err) {
            console.error('Error picking document:', err);
        }
    }

    return (
        <View style={{ justifyContent: 'center', padding: 10, marginLeft: 10 }}>
           
            <Button mode="contained" onPress={() => pickDocument()}>Carregar documento (.docx)</Button>

            {pickedDocument && (
                <View style={{ marginTop:10 }}>
                    <Text style={{ fontWeight:'bold' }}>Nome do Documento: {pickedDocument.name}</Text>
                </View>
            )}

            {/* <Text style={{ textAlign: 'center', marginTop: 100 }} onPress={toggleThemeType}>
                <Wave size={200} color={theme.colors.primary} />
            </Text> */}
        </View>
    );
};