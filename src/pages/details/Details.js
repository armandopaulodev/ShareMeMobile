import React, { useState } from 'react'
import { Text } from "react-native-paper";
import { Actionsheet, ActionsheetBackdrop, ActionsheetDragIndicator, ActionsheetContent, ActionsheetDragIndicatorWrapper, Pressable, GluestackUIProvider, Button, ButtonText } from '@gluestack-ui/themed';

export default function Details({ route, navigation }) {

    const [param, setParams] = useState(route.params);
    const [showActionsheet, setShowActionsheet] = React.useState(true)
    const handleClose = () => setShowActionsheet(!showActionsheet)

    return (<GluestackUIProvider>
        <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
            <ActionsheetBackdrop />
            <ActionsheetContent maxHeight="75%">
                <ActionsheetDragIndicatorWrapper>
                    <ActionsheetDragIndicator />
                </ActionsheetDragIndicatorWrapper>

            </ActionsheetContent>
        </Actionsheet>
    </GluestackUIProvider>)
}