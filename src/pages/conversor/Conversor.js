
import * as DocumentPicker from 'expo-document-picker';
import { Camera, FileArchive } from 'lucide-react-native';
import React, { useState } from "react";
import { View } from "react-native";
import { Fold, Wave } from 'react-native-animated-spinkit';
import { Button, Text } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
import ConvertionService from '../../services/conversor/ConvertionService';

export default function Conversor({ navigation }) {
    const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();
    const [pickedDocument, setPickedDocument] = useState(null);
    const [converting, setConverting]=useState(false);

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const pickDocument = async () => {
        
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
            });
            if (result.canceled === false) {
                setConverting(true); //enable spinner if picked
                setPickedDocument(result.assets[0]);
                 ConvertionService.wordToPdf(result.assets[0]).then((response)=>{
                    if (response.status === 200) {
                         delay(4000).then(()=>{
                            setConverting(false) //stop spinner
                         })
                      }
                 })         
            } else {
                console.log('Document picking canceled.');
            }
        } catch (err) {
            console.error('Error picking document:', err);
        }
    }

    return (
        <View style={{ justifyContent: 'center', padding: 10, marginLeft: 10 }}>
           
            <Button mode="contained" onPress={() => pickDocument()}>
                Carregar documento (.docx)
            </Button>

            {pickedDocument && (
                <View style={{ marginTop:10, justifyContent:'space-between' }}>
                    <Text style={{ fontWeight:'bold' }}>
                    <FileArchive color={theme.colors.secondary} size={48} />
                    {pickedDocument.name}
                    </Text>
                    
                </View>
            )}

            {
                converting? <>
                <Text style={{ textAlign: 'center', marginTop: 100 }} onPress={toggleThemeType}>
                    <Wave size={200} color={theme.colors.primary} />
                </Text>
                <Text style={{ textAlign: 'center', marginTop: 20 }} onPress={toggleThemeType}>
                    Convertendo! Por favor Aguarde...
                </Text>
                </> :''
            }
          
        </View>
    );
};