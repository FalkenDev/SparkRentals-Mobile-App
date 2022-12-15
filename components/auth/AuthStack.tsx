import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginHome from './LoginHome';
import EmailRegister from './EmailRegister';
import LoginForm from './LoginForm';

const Stack = createNativeStackNavigator();

export default function AuthStack({setToken, setIsLoggedIn}) {
    return (
        <Stack.Navigator initialRouteName="LoginHome" screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginHome" >
                {(screenProps) => <LoginHome {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="EmailRegister">
                {(screenProps) => <EmailRegister {...screenProps} setToken={setToken} setIsLoggedIn={setIsLoggedIn}></EmailRegister>}
            </Stack.Screen>

            <Stack.Screen name="LoginForm">
                {(screenProps) => <LoginForm {...screenProps}  setIsLoggedIn={setIsLoggedIn}></LoginForm>}
            </Stack.Screen>
        </Stack.Navigator>
        );
}
