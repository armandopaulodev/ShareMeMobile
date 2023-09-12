
import React, { useState, useEffect } from "react";
import { Image, View, FlatList, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Wander } from 'react-native-animated-spinkit';
import { Button, Dialog, Modal, Portal, Text, TextInput, Card } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
import RoomsService from "../../services/rooms/RoomsService";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function Classroom({ navigation }) {
    const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();
    const [visible, setVisible] = React.useState(false);
    const [visibleModal, setVisibleModal] = React.useState(false);
    const [name, setName] = useState('');
    const [dataSource, setDataSource] = useState([]);

    const showModal = () => setVisibleModal(true);
    const hideModal = () => setVisibleModal(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20, textAlign: 'center', justifyContent: 'center', marginLeft: 10, marginRight: 10 };
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    useEffect(() => {
        delay(1000).then(() => {
            RoomsService.getRoom().then((res) => {

                if (res.status === 200) {
                    setDataSource(res.data);
                }
            })
        })
    }, []);
    const createRoom = async () => {
        hideDialog();
        showModal();
        await RoomsService.creteRoom(name).then((response) => {
            if (response.status === 200) {

                delay(4000).then(() => {
                    setDataSource(response.data)
                    hideModal();
                })
            }
        })
    }

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
    ];


    return (
        <View style={{ justifyContent: 'center', padding: 35 }}>

            <Animatable.View animation='bounceIn' easing={'ease-in-out-quad'} iterationCount={3} direction="alternate">
                <Button onPress={showDialog} mode="contained" icon={'account-group'} style={{ padding: 10, backgroundColor: '#f87171' }}>
                    Crie Grupo de Compartilhamento
                </Button>
            </Animatable.View>


            {
                dataSource?.length === 0 ?
                    <Animatable.View animation='pulse' easing={'ease-in-out-quad'} iterationCount={2} direction="alternate">
                        <Image
                            source={require('../../../assets/photos/empty.png')}
                            style={{ width: 400, height: 400, alignSelf: 'center', top: 70 }}
                        />
                    </Animatable.View> :
                    <FlatList
                        data={dataSource}
                        renderItem={({ item }) =>
                           <TouchableOpacity style={{ border: 'none' }}>
                             <Card key={item.id} style={{ marginBottom: 10, marginTop: 5 }}>
                                <Card.Title title={item.name} subtitle={item.created_at} />
                                <Card.Content>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <MaterialIcons name="home" size={40} color="#44403c" />
                                    <Text variant="titleLarge">{item.name}</Text>
                                    </View>
                                    
                                </Card.Content>
                            </Card>
                           </TouchableOpacity>
                        }
                        keyExtractor={item => item.id}
                    />
            }

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