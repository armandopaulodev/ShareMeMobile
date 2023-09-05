
import React, { useState, useEffect } from "react";
import { View, Image, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Button, Card, Text, TextInput, ActivityIndicator } from "react-native-paper";
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

    useEffect(() => {
        TempFileService.getTempFile().then((res) => {

            if (res.status === 200) {
                setDataSource(res.data);
            }
        })
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.gridItem}>
            <Text>{item.text}</Text>
        </View>
    );
    return (
        <SafeAreaView>
            <View style={{ justifyContent: 'center', padding: 35, backgroundColor: 'white' }}>
                <Animatable.View animation='bounceIn' easing={'ease-in-out-quad'} iterationCount={3} direction="alternate">
                    <Button icon={{ source: "autorenew", direction: 'rtl' }} disabled={converting ? true : false} mode="contained" style={{ padding: 10, backgroundColor: '#f472b6' }}>
                        Carregar Ficheiro
                    </Button>
                </Animatable.View>

                {
                    dataSource.length === 0 ? <Animatable.View animation='pulse' easing={'ease-in-out-quad'} iterationCount={2} direction="alternate">
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
                                <Animatable.View animation='bounceIn' easing={'ease-in-out-quad'} iterationCount={3} direction="alternate" style={[styles2.itemContainer, { backgroundColor: '#cbd5e1' }]}>
                                    <FileText size={65} color={'#f472b6'} />
                                    <Text style={styles2.itemName}>{'Nome do Ficheiro'}</Text>
                                    <Text style={styles2.itemCode}>{item.id}</Text>
                                </Animatable.View>
                            )}
                        />

                }


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