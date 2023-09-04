
import * as DocumentPicker from 'expo-document-picker';
import { Camera, FileArchive } from 'lucide-react-native';
import React, { useState } from "react";
import { View } from "react-native";
import { Fold, Wave } from 'react-native-animated-spinkit';
import { Button, Text } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";

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
                <View style={{ marginTop:10, justifyContent:'space-between' }}>
                    <Text style={{ fontWeight:'bold' }}>
                    <FileArchive color={theme.colors.secondary} size={48} />
                    {pickedDocument.name}
                    <Fold size={10} color={theme.colors.secondary} />
                    </Text>
                    
                </View>
            )}

            <Text style={{ textAlign: 'center', marginTop: 100 }} onPress={toggleThemeType}>
                <Wave size={200} color={theme.colors.primary} />
            </Text>
            <Text style={{ textAlign: 'center', marginTop: 20 }} onPress={toggleThemeType}>
                Convertendo! Por favor Aguarde...
            </Text>
        </View>
    );
};