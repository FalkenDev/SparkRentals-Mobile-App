import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginHome from './LoginHome';
import EmailRegister from './EmailRegister';

const Stack = createNativeStackNavigator();

export default function AuthStack({setToken}) {
    return (
        <Stack.Navigator initialRouteName="LoginHome" screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginHome" >
                {(screenProps) => <LoginHome {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="EmailRegister">
                {() => <EmailRegister  setToken={setToken} ></EmailRegister>}
            </Stack.Screen>
        </Stack.Navigator>
        );
}
