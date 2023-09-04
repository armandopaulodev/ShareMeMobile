import React, { useRef, useState, useEffect } from "react";
import { FlatList, ScrollView, Text, View } from 'react-native';
import { Wave } from 'react-native-animated-spinkit';
import { Avatar, Button, Card } from "react-native-paper";
import DataTableComponent from "../../components/DataTable";
import { useTheme } from "../../context/ThemeContext";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;




export default function Home({ navigation }) {
 
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
    const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();





    const renderItem = ({ item }) => (
        <View style={{ width: '50%', marginBottom: 20 }}>
            <Text>{item.title}</Text>
        </View>
    );
    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 5, marginLeft: 5 }}>
            <ScrollView>
      
                <Card collapsable={true} style={{ marginBottom:15 }}>
                    <Card.Content>
                        <Button icon={{ source: "newspaper-variant-multiple-outline", direction: 'rtl' }}>
                            Nova Turma
                        </Button>
                    </Card.Content>
                </Card>
                <Card onPress={() => navigation.navigate('Conversor')} style={{ marginBottom:15 }}>
                    <Card.Content>
                        <Button icon={{ source: "autorenew", direction: 'rtl' }}>
                            Conversor
                        </Button>
                    </Card.Content>
                </Card>
                <Card style={{ marginBottom:15 }}>
                    <Card.Content>
                        <Button icon={{ source: "monitor-share", direction: 'rtl' }}>
                            Gerar e compartilhar
                        </Button>
                    </Card.Content>
                </Card>
                <DataTableComponent />
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}>
                </View>
            </ScrollView>
        </View>
    );
};

