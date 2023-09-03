import React from "react";
import { Avatar, Card, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
import { ScrollView, View, Text, FlatList, StyleSheet } from 'react-native';
import DataTableComponent from "../../components/DataTable";

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
        <View style={{ width: '50%', marginBottom:20 }}>
            <Text>{item.title}</Text>
        </View>
    );
    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 5, marginLeft:10 }}>
            <FlatList
                data={data}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
   <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: -250 }}>
   <Text style={{ fontWeight:'bold', color: theme.colors.primary }}>
    Seus uploads recentes
  </Text>
  <Button icon="book-play-outline" mode="outlined"  onPress={() => console.log('Pressed')}>
    Minhas Turmas
  </Button>
    </View>
            <DataTableComponent/>
           
        </View>
    );
};

