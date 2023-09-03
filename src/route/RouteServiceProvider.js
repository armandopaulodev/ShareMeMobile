import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { Avatar } from "react-native-paper";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import AuthService from "../services/auth/AuthService";
import Header from "../components/header";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;


const Stack = createStackNavigator();

export default function RouteServiceProvider() {

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // Check authentication status when the component mounts
        const checkAuthentication = async () => {
            const isAuthenticatedUser = await AuthService.isAuthenticated();
            setAuthenticated(isAuthenticatedUser);
        };

        checkAuthentication();
    }, []);


    const config = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };

    return (

        <Stack.Navigator screenOptions={{
            header: (props) => <Header {...props}/>
        }}>
            {authenticated ? (
                <>
                    <Stack.Screen name="home" component={Home} />
                </>
            ) : (
                <>
                    <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                </>
            )}

            <Stack.Screen name="/" component={Home} />

        </Stack.Navigator>
    );
};


