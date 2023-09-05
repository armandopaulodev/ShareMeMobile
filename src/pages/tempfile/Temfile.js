
import React, { useState, useEffect } from "react";
import { View, Image, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Button, Card, Text, TextInput, ActivityIndicator, Portal, Modal, Dialog, Checkbox } from "react-native-paper";
import { ThemeContextProvider, useTheme } from "../../context/ThemeContext";
import { Plane, Swing } from 'react-native-animated-spinkit'
import AuthService from "../../services/auth/AuthService";
import * as Animatable from 'react-native-animatable';
import TempFileService from "../../services/tempfiles/TempFileService";
import { FlatGrid } from 'react-native-super-grid';
import { FileText } from 'lucide-react-native'

export default function Tempfile({ navigation }) {
    const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();
    const [converting, setConverting] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    const [visible, setVisible] = React.useState(false);
    const [visibleModal, setVisibleModal] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const showModal = () => setVisibleModal(true);
    const hideModal = () => setVisibleModal(false);


    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const containerStyle = { backgroundColor: 'white', padding: 20, justifyContent: 'center', marginLeft: 10, marginRight: 10 };
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

    return (
        <SafeAreaView>
            <View style={{ justifyContent: 'center', padding: 35, backgroundColor: 'white' }}>
                <Animatable.View animation='bounceIn' easing={'ease-in-out-quad'} iterationCount={3} direction="alternate">
                    <Button onPress={showDialog} icon={{ source: "newspaper-plus", direction: 'rtl' }} disabled={converting ? true : false} mode="contained" style={{ padding: 10, backgroundColor: '#f472b6' }}>
                        Criar Novo
                    </Button>
                </Animatable.View>

                {
                    dataSource.length === 0 ?
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
                                    <FileText size={65} color={'#f472b6'} />
                                    <Text style={styles2.itemName}>{'Nome do Ficheiro'}</Text>
                                    <Text style={styles2.itemCode}>{item.id}</Text>
                                </Animatable.View>
                            )}
                        />

                }

                <Portal>
                    <Modal visible={visibleModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <Text>Example Modal.  Click outside this area to dismiss.</Text>
                    </Modal>
                </Portal>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Upload de ficheiro</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                label="Email"
                                mode="outlined"
                                style={{ marginTop: 14 }}

                            />
                          
                            <Button mode="outlined" icon={'upload'} style={{ marginTop: 8 }}>Carregar Ficheiro</Button>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button mode="elevated" icon={'content-save'} onPress={hideDialog}>Finalizar</Button>
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