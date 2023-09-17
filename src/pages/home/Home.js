import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Card, Divider } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
import CategoryComponent from "../../components/CategoryComponent";
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
        <View style={{ flex: 1, padding: 5, marginLeft: 2 }}>
            <CategoryComponent />
            <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', paddingBottom: 25, columnGap: 12 }}>
                    <View key={1} >
                        <Card onPress={() => navigation.navigate('Ficheiro Temporario')} collapsable={true} style={styles.carouselItem}>
                            <Card.Content>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Image
                                        source={require('../../../assets/photos/temp.png')}
                                        style={{ width: 170, height: 145, alignSelf: 'center', top: -14 }}
                                    />
                                    <View style={{ marginLeft: -20 }}>
                                        <Text style={styles.carouselText}>Uploader</Text>
                                        <Text style={styles.carouselSubtitle}>Gerar e compartilhar</Text>
                                        <Text style={styles.carouselSubtitle}>Ficheiros temporarios</Text>
                                    </View>

                                </View>
                            </Card.Content>

                        </Card>

                    </View>
                    <View key={2} >
                        <Card onPress={() => navigation.navigate('Nova Turma')} collapsable={true} style={styles.carouselItem}>
                            <Card.Content>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Image
                                        source={require('../../../assets/photos/empty.png')}
                                        style={{ width: 170, height: 145, alignSelf: 'center', top: -14 }}
                                    />
                                    <View style={{ marginLeft: -20 }}>
                                        <Text style={styles.carouselText}>Crie turmas</Text>
                                        <Text style={styles.carouselSubtitle}>Melhore a sua experiencia</Text>
                                        <Text style={styles.carouselSubtitle}>colaborando em grupo</Text>
                                    </View>

                                </View>
                            </Card.Content>

                        </Card>

                    </View>
                    <View key={3} >
                        <Card onPress={() => navigation.navigate('Conversor')} collapsable={true} style={styles.carouselItem}>
                            <Card.Content>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Image
                                        source={require('../../../assets/photos/wortopdf.png')}
                                        style={{ width: 170, height: 145, alignSelf: 'center', top: -14 }}
                                    />
                                    <View style={{ marginLeft: -20 }}>
                                        <Text style={styles.carouselText}>Conversor</Text>
                                        <Text style={styles.carouselSubtitle}>Converta ficheiros gratis</Text>
                                        <Text style={styles.carouselSubtitle}>docx para pdf</Text>
                                    </View>

                                </View>
                            </Card.Content>

                        </Card>

                    </View>
                </ScrollView>
            </View>
            <Divider />

        </View>
    );
};

const styles = StyleSheet.create({
    carouselItem: {
        width: 340, // Set the width of each item
        height: 150, // Set the height of each item
        marginHorizontal: 10,
        borderRadius: 20,
    },
    carouselText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10,
        color: '#94a3b8'
    },
    carouselSubtitle: {
        fontSize: 14,
        color: '#94a3b8'
    }
});