import React from "react";
import { Image, ScrollView, Text, View } from 'react-native';
export default function CategoryComponent() {



    return (
        <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', paddingBottom:25, columnGap:12 }}>
                <View key={1} style={{ borderColor: '#94a3b8', borderWidth: 1.5, borderRadius: 100, width: 50, height: 50 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/photos/temp.png')}
                            style={{ width: 50, height: 55, alignSelf: 'center', padding: 3 }}
                        />
                        <Text>Politica</Text>
                    </View>
                </View>
                <View key={2} style={{ borderColor: '#94a3b8', borderWidth: 1.5, borderRadius: 100, width: 50, height: 50 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/photos/temp.png')}
                            style={{ width: 50, height: 55, alignSelf: 'center', padding: 3 }}
                        />
                        <Text>Politica</Text>
                    </View>
                </View>
                <View key={3} style={{ borderColor: '#94a3b8', borderWidth: 1.5, borderRadius: 100, width: 50, height: 50 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/photos/empty.png')}
                            style={{ width: 50, height: 55, alignSelf: 'center', padding: 3 }}
                        />
                        <Text>Politica</Text>
                    </View>
                </View>
                <View key={4} style={{ borderColor: '#94a3b8', borderWidth: 1.5, borderRadius: 100, width: 50, height: 50 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/photos/temp.png')}
                            style={{ width: 50, height: 55, alignSelf: 'center', padding: 3 }}
                        />
                        <Text>Politica</Text>
                    </View>
                </View>
                <View key={5} style={{ borderColor: '#94a3b8', borderWidth: 1.5, borderRadius: 100, width: 50, height: 50 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/photos/empty.png')}
                            style={{ width: 50, height: 55, alignSelf: 'center', padding: 3 }}
                        />
                        <Text>Politica</Text>
                    </View>
                </View>
                <View key={6} style={{ borderColor: '#94a3b8', borderWidth: 1.5, borderRadius: 100, width: 50, height: 50 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/photos/temp.png')}
                            style={{ width: 50, height: 55, alignSelf: 'center', padding: 3 }}
                        />
                        <Text>Politica</Text>
                    </View>
                </View>
                <View key={7} style={{ borderColor: '#94a3b8', borderWidth: 1.5, borderRadius: 100, width: 50, height: 50 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/photos/empty.png')}
                            style={{ width: 50, height: 55, alignSelf: 'center', padding: 3 }}
                        />
                        <Text>Politica</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}