import { createStackNavigator } from "@react-navigation/stack";
import React, {useEffect, useState} from "react";
import "react-native-gesture-handler";
import { Avatar } from "react-native-paper";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import AuthService from "../services/auth/AuthService";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;


const Stack = createStackNavigator();

export default function RouteServiceProvider(){

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      // Check authentication status when the component mounts
      const checkAuthentication = async () => {
        const isAuthenticatedUser = await AuthService.isAuthenticated();
        setAuthenticated(isAuthenticatedUser);
      };
  
      checkAuthentication();
    }, []);
    
  return (

      <Stack.Navigator>
         {authenticated ? (
          <>
            <Stack.Screen name="home" component={Home}  options={{ headerShown: false }}/>
          </>
        ) : (
          <>
            <Stack.Screen name="login" component={Login} options={{ headerShown: false }}/>
          </>
        )}
        
        <Stack.Screen name="home" component={Home}  options={{ headerShown: false }}/>

        </Stack.Navigator>
  );
};


