import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from './Map';
import LoginHome from './auth/LoginHome';

const Stack = createNativeStackNavigator();

export default function mapStack({API_KEY, position, setPosition}) {
    return (
        <Stack.Navigator initialRouteName="MapHome" screenOptions={{headerShown: false}}>
            <Stack.Screen name="MapHome">
                {() => <Map API_KEY={API_KEY} position={position} setPosition={setPosition} />}
            </Stack.Screen>
        </Stack.Navigator>
        );
}


