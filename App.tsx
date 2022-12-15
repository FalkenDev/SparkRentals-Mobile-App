import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Text, View } from 'react-native';
// import Map from './components/Map';
import MapNavigator from './components/MapNavigator';
import Login from './components/auth/LoginHome';
import Map from './components/Map'
import AuthStack from './components/auth/AuthStack';
import FlashMessage from 'react-native-flash-message';
import React from 'react';
import {API_KEY} from "@env";
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmailRegister from './components/auth/EmailRegister';

const Stack = createNativeStackNavigator();

export default function App() {    
  const [position, setPosition] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          
          {isLoggedIn ?
        <Stack.Screen name="MapNavigator">
          {() => <MapNavigator token={token} API_KEY={API_KEY} position={position} setPosition={setPosition}/>}
        </Stack.Screen>
        :
        <Stack.Screen name="Auth">
          {() => <AuthStack setToken={setToken} setIsLoggedIn={setIsLoggedIn}/>}
        </Stack.Screen>
        }
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position={'top'}/>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
// {/* <View style={styles.container}>
// <StatusBar style="auto" />
//     </View> */}
// {isLoggedIn ?
//   <Stack.Screen name="Map">
//     {() => <Map API_KEY={API_KEY} position={position} setPosition={setPosition}></Map>}
//   </Stack.Screen>
//   :
//   <Stack.Screen name="Auth" component={Login}/>
 
// }