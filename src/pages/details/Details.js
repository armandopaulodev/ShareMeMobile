import React, { useMemo, useState } from 'react'
import { View, Animated, Dimensions, StyleSheet, Alert, Linking, FlatList } from 'react-native';
import { Text } from "react-native-paper";
import { Image, GluestackUIProvider } from '@gluestack-ui/themed';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .48;

export default function Details({ route, navigation }) {

    const [param, setParams] = useState(route.params);
    const scrollY = React.useRef(new Animated.Value(0)).current;
    // variables bottom sheet
    const snapPoints = useMemo(() => ['45%', '80%'], []);

    //Spinner

    const [loader, setLoading] = useState(false);
    const [showActionsheet, setShowActionsheet] = React.useState(true)
    const handleClose = () => setShowActionsheet(true);

    const loadSpinner = () => {
        setLoading(!loader);
    }
    return (<GluestackUIProvider>
        <View style={{ backgroundColor: '#f1f5f9', minHeight: height, overflow: 'hidden' }}>

            <Animated.FlatList
                data={[param.urlToImage, param.urlToImage, param.urlToImage]}
                keyExtractor={(_, index) => index.toString()}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                horizontal={true}
                bounces={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                renderItem={({ item }) =>
                    <View>
                        <Image source={{ uri: item }} style={styles.imagens} alt="image"
                            onLoadStart={() => loadSpinner()} onLoadEnd={() => loadSpinner()} />
                    </View>
                }
            />
        </View>
        <BottomSheet snapPoints={snapPoints} >
            <BottomSheetScrollView contentContainerStyle={{ padding: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 }}>
                    <Text style={{ fontSize: 12, fontWeight: '100' }}>Por: {param.author}</Text>

                    <Text style={{ fontSize: 10, fontWeight: '100' }}>{param.publishedAt}</Text>
                </View>
                <Text style={{ fontSize: 25, fontWeight: '400' }}>{param.title}</Text>
                <Text>{param.content}</Text>
            </BottomSheetScrollView>
        </BottomSheet>
    </GluestackUIProvider>)
}


const styles = StyleSheet.create({
    imagens: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        resizeMode: 'cover'
    }
})