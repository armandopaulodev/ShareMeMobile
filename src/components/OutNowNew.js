import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar } from "react-native-paper";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
export default function OutNowNew({ navigation, dataSource }) {
    const reversedArray = dataSource?.slice().reverse();
    return (<View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', paddingBottom: 25, columnGap: 12 }}>
            {
                reversedArray?.map((item, index) => (

                    <Pressable onPress={() => navigation.navigate('Detalhes', item)} key={index}>
                        <View style={styles.card} key={index}>
                            <Image source={{ uri: item.urlToImage }} style={styles.image} />
                            <View style={styles.overlay}>
                                <Text style={styles.overlayText}>{item.title}</Text>

                            </View>

                        </View>
                    </Pressable>
                ))
            }


        </ScrollView>
    </View>)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        minWidth: 380,

    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 15
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust the opacity or color as needed
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    overlayText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 16,
    },
    description: {
        fontSize: 14,
        marginHorizontal: 16,
        marginBottom: 0,
    },
});