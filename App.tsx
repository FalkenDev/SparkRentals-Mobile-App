import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Text, View, Button } from 'react-native';
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


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
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
        <Drawer.Screen name="MapNavigator">
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
        {/* <Drawer.Screen name="Feed" component={Feed} /> */}

        </Drawer.Navigator>
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