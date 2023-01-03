import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Text, View, Button, Image } from 'react-native';
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
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Wallet from './components/drawer/Wallet';
import History from './components/drawer/History';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Image style={styles.drawerImage} source={require('./assets/logo_dark.png')}></Image>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function App() {    
  const [position, setPosition] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [toggleDrawer, setToggelDrawer] = useState(false);

  return (
    <View style={styles.container}>
      
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{headerShown: false}}  useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}>

        {isLoggedIn ?
        <Drawer.Screen name="Map">
          {(screenProps) => <MapNavigator {...screenProps} token={token} API_KEY={API_KEY} position={position} setPosition={setPosition}/>}
        </Drawer.Screen>
        :
        <Drawer.Screen name="Auth">
          {() => <AuthStack setToken={setToken} setIsLoggedIn={setIsLoggedIn}/>}
        </Drawer.Screen>
        }
        
        <Drawer.Screen name='Wallet'>
          {(screenProps) => <Wallet {...screenProps} />}
        </Drawer.Screen>

        <Drawer.Screen name='Ride History'>
          {(screenProps) => <History {...screenProps} />}
        </Drawer.Screen>

        </Drawer.Navigator>
      </NavigationContainer>

      <FlashMessage position={'top'}/>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  drawerImage: {
    margin: 20,
    marginBottom: 50,
    marginTop: 30
  },
});