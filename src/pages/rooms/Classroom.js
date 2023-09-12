
import React, { useState } from "react";
import { Image, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Wander } from 'react-native-animated-spinkit';
import { Button, Dialog, Modal, Portal, Text, TextInput } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
import RoomsService from "../../services/rooms/RoomsService";


export default function Classroom({ navigation }) {
    const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();
    const [visible, setVisible] = React.useState(false);
    const [visibleModal, setVisibleModal] = React.useState(false);
    const [name, setName]=useState('');

    const showModal = () => setVisibleModal(true);
    const hideModal = () => setVisibleModal(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20, textAlign: 'center', justifyContent: 'center', marginLeft: 10, marginRight: 10 };
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    const createRoom = async () =>{
        hideDialog();
        showModal();
        await RoomsService.creteRoom(name).then((response)=>{
            if (response.status === 200) {

                delay(4000).then(() => {
                    // setDataSource(response.data)
                    hideModal();
                })
            }
        })
    }
    return (
        <View style={{ justifyContent: 'center', padding: 35 }}>

            <Animatable.View animation='bounceIn' easing={'ease-in-out-quad'} iterationCount={3} direction="alternate">
                <Button onPress={showDialog} mode="contained" icon={'account-group'} style={{ padding: 10, backgroundColor:'#f87171' }}>
                    Crie Grupo de Compartilhamento
                </Button>
            </Animatable.View>



            <Animatable.View animation='pulse' easing={'ease-in-out-quad'} iterationCount={2} direction="alternate">
                <Image
                    source={require('../../../assets/photos/empty.png')}
                    style={{ width: 400, height: 400, alignSelf: 'center', top: 70 }}
                />
            </Animatable.View>
            <Portal>
                    <Modal visible={visibleModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <Text style={{ textAlign: 'center' }}>
                            Criando a turma
                        </Text>
                        <Text style={{ textAlign: 'center' }}>
                            <Wander size={50} color={'#f472b6'} />
                        </Text>
                    </Modal>
                </Portal>
            <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Criar Turma</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                label="Nome da Turma"
                                mode="outlined"
                                style={{ marginTop: 14 }}
                                onChangeText={text => setName(text)}
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={createRoom} mode="elevated" icon={'content-save'}>Criar Turma</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>


        </View>
    );
};