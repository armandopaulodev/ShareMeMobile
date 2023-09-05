
import React, { useState, useEffect } from "react";
import { View, Image, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Share } from "react-native";
import { Button, Card, Text, TextInput, ActivityIndicator, Portal, Modal, Dialog, Checkbox } from "react-native-paper";
import { ThemeContextProvider, useTheme } from "../../context/ThemeContext";
import { Plane, Swing, Wander } from 'react-native-animated-spinkit'
import AuthService from "../../services/auth/AuthService";
import * as Animatable from 'react-native-animatable';
import TempFileService from "../../services/tempfiles/TempFileService";
import { FlatGrid } from 'react-native-super-grid';
import { FileText } from 'lucide-react-native'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

export default function Tempfile({ navigation }) {
    const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();
    const [converting, setConverting] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    const [visible, setVisible] = React.useState(false);
    const [visibleModal, setVisibleModal] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [file, setFile] = React.useState('');

    const showModal = () => setVisibleModal(true);
    const hideModal = () => setVisibleModal(false);


    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const containerStyle = { backgroundColor: 'white', padding: 20,textAlign:'center', justifyContent: 'center', marginLeft: 10, marginRight: 10 };
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    useEffect(() => {
        delay(3000).then(() => {
            TempFileService.getTempFile().then((res) => {

                if (res.status === 200) {
                    setDataSource(res.data);
                }
            })
        })
    }, []);

    const pickDocument = async () => {

        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });
            if (result.canceled === false) {
                setConverting(true); //enable spinner if picked
                setFile(result.assets[0]);

            } else {
                console.log('Document picking canceled.');
            }
        } catch (err) {
            console.error('Error picking document:', err);
        }
    }

    const upLoad = async () => {
        hideDialog();
        showModal();
        await TempFileService.upLoadFile(file).then((response) => {
            if (response.status === 200) {

                delay(4000).then(() => {
                    setDataSource(response.data)
                    hideModal();
                    setConverting(false)
                    setFile('');
                })
            }
        })
    }

    const ShareFile = async (url)=>{
       await Share.share({
            message: url
          }); 
    }
    return (
        <SafeAreaView>
            <View style={{ justifyContent: 'center', padding: 35, backgroundColor: 'white' }}>
                <Animatable.View animation='bounceIn' easing={'ease-in-out-quad'} iterationCount={3} direction="alternate">
                    <Button onPress={showDialog} icon={{ source: "newspaper-plus", direction: 'rtl' }} disabled={converting ? true : false} mode="contained" style={{ padding: 10, backgroundColor: '#f472b6' }}>
                        Criar Novo
                    </Button>
                </Animatable.View>

                {
                    dataSource?.length === 0 ?
                        <Animatable.View animation='pulse' easing={'ease-in-out-quad'} iterationCount={2} direction="alternate">
                            <Image
                                source={require('../../../assets/photos/temp.jpg')}
                                style={{ width: 400, height: 400, alignSelf: 'center', top: 70 }}
                            />
                        </Animatable.View> :
                        <FlatGrid
                            itemDimension={130}
                            data={dataSource}
                            style={styles2.gridView}
                            spacing={5}
                            renderItem={({ item }) => (
                                <Animatable.View animation='pulse' easing={'ease-in-out-quad'} iterationCount={3} direction="alternate" style={[styles2.itemContainer, { backgroundColor: '#cbd5e1' }]}>
                                   <TouchableOpacity onPress={()=>ShareFile(item.url)}>
                                   <FileText size={65} color={'#f472b6'} />
                                    <Text style={styles2.itemName}>{'Nome do Ficheiro'}</Text>
                                    <Text style={styles2.itemCode}>{item.id}</Text>
                                   </TouchableOpacity>
                                </Animatable.View>
                            )}
                        />

                }

                <Portal>
                    <Modal visible={visibleModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <Wander color="#f472b6" size={50} />
                    </Modal>
                </Portal>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Upload de ficheiro</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                label="Numero de Download"
                                mode="outlined"
                                style={{ marginTop: 14 }}

                            />

                            <Button mode="outlined" icon={'upload'} style={{ marginTop: 8 }} onPress={pickDocument}>Carregar Ficheiro</Button>
                            <Text style={{ fontWeight: 'bold' }}>
                                {file.name}
                            </Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={upLoad} mode="elevated" icon={'content-save'}>Finalizar</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </SafeAreaView>
    );
};




const styles2 = StyleSheet.create({
    gridView: {
        marginTop: 10,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 10,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 20,
        color: '#a8a29e',
    },
});