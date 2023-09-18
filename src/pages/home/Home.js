import React from "react";
import { Text, View, FlatList, StyleSheet, Image,Pressable } from 'react-native';
import { Avatar, Divider } from "react-native-paper";
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoryComponent from "../../components/CategoryComponent";
import OutNowNew from "../../components/OutNowNew";
import { useTheme } from "../../context/ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;


export default function Home({ navigation }) {




    const newsData = [
        {
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,',
            description: 'Description of news article 1.',
            author: 'John Doe',
            imageUrl: require('../../../assets/photos/temp.png'),
        },
        {
            title: 'News Title 2',
            description: 'Description of news article 2.kkkkkkkkkkkkkkkk',
            author: 'Jane Smith',
            imageUrl: require('../../../assets/photos/wortopdf.png'),
        }, {
            title: 'News Title 3',
            description: 'Description of news article 2.',
            author: 'Jane Smith',
            imageUrl: require('../../../assets/photos/wortopdf.png'),
        },
        {
            title: 'News Title 4',
            description: 'Description of news article 2.',
            author: 'Jane Smith',
            imageUrl: require('../../../assets/photos/wortopdf.png'),
        },

    ];

    const NewsCard = ({item}) => {
        return (
            <Pressable
                style={{ backgroundColor: '#fff' }}
                onPress={() => navigation.navigate('Detalhes', item )}
            >
                <View style={styles.card}>
                    <Image source={item.imageUrl} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.author}>Author: {item.author}</Text>
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <View style={{ flex: 1, padding: 5, marginLeft: 2 }}>
            <CategoryComponent />
            <OutNowNew />
            <View style={{ paddingBottom: 10, marginLeft: 5 }}>
                <Ionicons name="newspaper-outline" />
                <Text style={{ fontWeight: '200', fontSize: 16 }}>Actualizacoes</Text>
            </View>
            <Divider />
            <FlatList
                data={newsData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <NewsCard
                       item={item}
                    />
                )}
                style={styles.container}
            />

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        flexDirection: 'row',
    },
    image: {
        width: 120,
        height: 120,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    textContainer: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '400',
    },
    description: {
        fontSize: 14,
        marginTop: 8,
    },
    author: {
        fontSize: 12,
        marginTop: 8,
        color: 'gray',
    },
});