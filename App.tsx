import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import Map from './components/Map';
import Login from './components/Login';
import FlashMessage from 'react-native-flash-message';
import React from 'react';
import {API_KEY} from "@env";


export default function App() {    
  const [position, setPosition] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <View style={styles.container}>

      {isLoggedIn ?
        <Map API_KEY={API_KEY} position={position} setPosition={setPosition}></Map>
        :
        <Login></Login>
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
