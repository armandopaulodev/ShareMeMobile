import React, { useRef, useState, useEffect } from "react";
import { FlatList, ScrollView, Text, View } from 'react-native';
import { Wave } from 'react-native-animated-spinkit';
import { Avatar, Button, Card } from "react-native-paper";
import DataTableComponent from "../../components/DataTable";
import { useTheme } from "../../context/ThemeContext";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function Home({ navigation }) {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

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
                <Card onPress={()=>navigation.navigate('conversor')}>
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

    const renderItem = ({ item }) => (
        <View style={{ width: '50%', marginBottom: 20 }}>
            <Text>{item.title}</Text>
        </View>
    );
    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 5, marginLeft: 10 }}>
            <ScrollView>
                <FlatList
                    data={data}
                    numColumns={2}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />

                <DataTableComponent />
                {/* <Text style={{ textAlign: 'center', marginTop: 100 }} onPress={toggleThemeType}>
                    <Wave size={120} color={theme.colors.primary} />
                </Text> */}
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}>
                   
                    <Button mode="elevated"
                        onPress={async () => {
                            await schedulePushNotification();
                        }}
                    >Nofify</Button>
                </View>
            </ScrollView>
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