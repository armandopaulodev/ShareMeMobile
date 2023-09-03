import React from "react";
import { Avatar, Card, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
import { ScrollView, View, Text, FlatList, StyleSheet } from 'react-native';
import DataTableComponent from "../../components/DataTable";
import { Plane, Swing, Fold, Wave, Wander,Pulse, Circle, CircleFade, Flow, Grid } from 'react-native-animated-spinkit'

export default function Home({ navigation }) {
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
    const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();

    const data = [
        {
            id: '1',
            title:
                <Card>
                    <Card.Content>
                        <Button icon={{ source: "newspaper-variant-multiple-outline", direction: 'rtl' }}>
                            Criar Turma
                        </Button>
                    </Card.Content>
                </Card>
        },
        {
            id: '2',
            title:
                <Card>
                    <Card.Content>
                        <Button icon={{ source: "autorenew", direction: 'rtl' }}>
                            Conversor
                        </Button>
                    </Card.Content>
                </Card>
        },
        {
            id: '3',
            title:
                <Card>
                    <Card.Content>
                        <Button icon={{ source: "monitor-share", direction: 'rtl' }}>
                            Gerar e compartilhar
                        </Button>
                    </Card.Content>
                </Card>
        },

    ];

    const renderItem = ({ item }) => (
        <View style={{ width: '50%', marginBottom: 20 }}>
            <Text>{item.title}</Text>
        </View>
    );
    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 5, marginLeft: 10 }}>
            <ScrollView>
            <FlatList
                data={data}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            
            <DataTableComponent />
            <Text style={{ textAlign: 'center', marginTop: 100 }} onPress={toggleThemeType}>
                            <Wave size={120} color={theme.colors.primary} />
                        </Text>
            </ScrollView>
        </View>
    );
};

