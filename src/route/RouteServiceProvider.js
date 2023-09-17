import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import "react-native-gesture-handler";
import { Avatar } from "react-native-paper";
import Header from "../components/Header";
import Home from "../pages/home/Home";
import Details from "../pages/details/Details";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;


const Stack = createStackNavigator();

export default function RouteServiceProvider() {

    return (

        <Stack.Navigator screenOptions={{
            header: (props) => <Header {...props}/>
        }}>
           
        <Stack.Screen name="Noticias" component={Home} />
        <Stack.Screen name="Detalhes" component={Details} />
        </Stack.Navigator>
    );
};


