import React, { useMemo, useState } from 'react'
import { View, Animated, Dimensions, StyleSheet, Alert, Linking } from 'react-native';
import { Text } from "react-native-paper";
import { Image, GluestackUIProvider } from '@gluestack-ui/themed';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .35;

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
        <View style={{ backgroundColor: '#f1f5f9', minHeight:height }}>
            <View>
                <Image source={param.imageUrl} style={styles.imagens} alt="imoveis"
                    onLoadStart={() => loadSpinner()} onLoadEnd={() => loadSpinner()} />
            </View>
         
        </View>
        <BottomSheet snapPoints={snapPoints}>
                <BottomSheetScrollView contentContainerStyle={{ padding:10 }}>

                    <Text>orem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas venenatis sollicitudin sapien, vitae scelerisque massa ornare volutpat. Nam orci mi, laoreet sed varius nec, congue quis odio. Aenean consequat quam laoreet feugiat accumsan. Nunc scelerisque, urna in convallis cursus, eros magna consequat mi, sit amet accumsan erat nulla vitae nisi. Praesent in elit porttitor, laoreet est in, condimentum felis. Sed non dictum massa. Mauris vel tristique felis, quis gravida metus. Cras et nisi a nisi porta tristique in sit amet est. Nam augue sem, lobortis a semper scelerisque, consectetur sit amet eros. Aliquam non varius magna.

                        Nam vel magna ac urna congue aliquam sit amet vel lectus. Vestibulum tristique viverra cursus. Duis sed eros urna. Ut eget urna erat. Sed pulvinar fringilla lacus ac lobortis. Aliquam a sagittis enim. Pellentesque id nisi quis elit venenatis tempus. Integer auctor iaculis justo sit amet iaculis. Aliquam sit amet gravida arcu. Nunc sed nibh convallis, malesuada nisl nec, molestie enim. Phasellus vestibulum, dolor consectetur lacinia tristique, velit dui mollis felis, in consectetur urna arcu gravida ipsum. In turpis erat, euismod nec arcu vel, iaculis commodo nunc. Aenean tempor accumsan nisl quis interdum. Quisque enim risus, pulvinar vel facilisis a, pellentesque sit amet purus. Donec in ante mauris. Sed neque nisl, vulputate sit amet lobortis vel, egestas auctor elit.

                        Duis imperdiet dolor ut orci feugiat, vitae cursus arcu vestibulum. Donec eros arcu, lobortis in laoreet sed, faucibus non ex. Integer arcu lectus, viverra non rutrum eu, lacinia nec mi. Curabitur maximus posuere mauris, a ultrices nisl venenatis porttitor. Nam eleifend velit at urna ornare posuere. In aliquet dictum nibh, nec eleifend nibh hendrerit at. Nunc a purus eu urna ornare feugiat. Quisque pulvinar lacus neque, vel finibus libero malesuada eget. Donec fringilla rhoncus finibus. Vestibulum finibus in tortor non vestibulum. Aenean consequat eget elit eu iaculis. Sed blandit, sapien et ullamcorper dignissim, leo purus dictum mi, vel bibendum sapien lacus et velit.

                        Ut eu diam pellentesque, lacinia lacus a, iaculis nisi. Fusce tempus elit in lorem blandit blandit. Aliquam porta tempor massa sit amet dictum. Fusce fermentum est magna, non luctus quam tincidunt ac. Aenean mattis lacinia leo dictum ultricies. Sed feugiat dolor ipsum, sit amet elementum orci porta ac. Sed vehicula faucibus nisi, gravida posuere tellus laoreet ac. Quisque placerat imperdiet lacus sit amet hendrerit. Nulla eu lectus non est egestas pellentesque.</Text>
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