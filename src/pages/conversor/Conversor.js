
import * as DocumentPicker from 'expo-document-picker';
import React, { useState, useEffect, useRef } from "react";
import { View, Image } from "react-native";
import { Fold, Wave } from 'react-native-animated-spinkit';
import { Button, Text } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
import ConvertionService from '../../services/conversor/ConvertionService';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as Animatable from 'react-native-animatable';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
export default function Conversor({ navigation }) {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();
    const [pickedDocument, setPickedDocument] = useState(null);
    const [converting, setConverting] = useState(false);

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const pickDocument = async () => {

        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });
            if (result.canceled === false) {
                setConverting(true); //enable spinner if picked
                setPickedDocument(result.assets[0]);
                ConvertionService.wordToPdf(result.assets[0]).then((response) => {
                    if (response.status === 200) {

                        delay(4000).then(() => {
                            schedulePushNotification(); //local notification
                            setConverting(false) //stop spinner
                            FileSystem.downloadAsync(
                                response.data.url,
                                FileSystem.documentDirectory + 'convertido.pdf'
                            )
                                .then(({ uri }) => {
                                    console.log('Finished downloading to ', uri);
                                    // Saving the file in a folder name `MyImages`
                                    const { status } = MediaLibrary.getPermissionsAsync();
                                    if (status === "granted") {
                                        const asset = MediaLibrary.createAssetAsync(url)
                                        MediaLibrary.createAlbumAsync("MyImages", asset, false)
                                    }

                                    // Sharing the downloded file
                                    Sharing.shareAsync(uri);
                                })
                                .catch(error => {
                                    console.error(error);
                                });
                        })
                    }
                })
            } else {
                console.log('Document picking canceled.');
            }
        } catch (err) {
            console.error('Error picking document:', err);
        }
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        <View style={{ justifyContent: 'center', padding: 10, marginLeft: 10 }}>

            {pickedDocument && (
                <View style={{ marginTop: 10, justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'bold' }}>
                        {/* icon */}
                        {pickedDocument.name}
                    </Text>

                </View>
            )}

            {
                converting ? <>
                    <Text style={{ textAlign: 'center', marginTop: 100 }} onPress={toggleThemeType}>
                        <Wave size={200} color={'#f87171'} />
                    </Text>
                    <Text style={{ textAlign: 'center', marginTop: 20 }} onPress={toggleThemeType}>
                        Convertendo! Por favor Aguarde...
                    </Text>
                </> : ''
            }

            {
                converting ? '' :
                    <Animatable.View animation='pulse' easing={'ease-in-out-quad'} iterationCount={2} direction="alternate">
                        <Image
                            source={require('../../../assets/photos/wortopdf.png')}
                            style={{ width: 400, height: 400, alignSelf: 'center', top: 70 }}
                        />
                    </Animatable.View>
            }
            <Animatable.View animation='bounceIn' easing={'ease-in-out-quad'} iterationCount={3} direction="alternate">
                <Button icon={{ source: "autorenew", direction: 'rtl' }} disabled={converting ? true : false} mode="contained" onPress={() => pickDocument()} style={{ padding: 10, marginTop: 50, backgroundColor: '#f87171' }}>
                    Carregar documento (.docx)
                </Button>
            </Animatable.View>
        </View>
    );
};

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Sua tarefra fui concluida 📬",
            body: 'Acabou de converter um ficheiro',
            data: { data: 'goes here' },
        },
        trigger: { seconds: 1 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        // Learn more about projectId:
        // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
        token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}