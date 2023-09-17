import React, { useMemo, useState } from 'react'
import { View, Animated, Dimensions, StyleSheet, Alert, Linking } from 'react-native';
import { Text } from "react-native-paper";
import { Image, GluestackUIProvider } from '@gluestack-ui/themed';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .30;

export default function Details({ route, navigation }) {

    const [param, setParams] = useState(route.params);

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
        <View style={{ backgroundColor:'#cbd5e1' }}>
        <View>
            <Image source={param.imageUrl} style={styles.imagens} alt="imoveis"
                onLoadStart={() => loadSpinner()} onLoadEnd={() => loadSpinner()} />
        </View>
        <BottomSheet snapPoints={snapPoints}>
            <BottomSheetScrollView>


            </BottomSheetScrollView>
        </BottomSheet>
        </View>

    </GluestackUIProvider>)
}


const styles = StyleSheet.create({
    imagens: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        resizeMode: 'cover'
    }
})