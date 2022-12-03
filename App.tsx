import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import Map from './components/Map';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  const [position, setPosition] = useState({});
  return (
    <View style={styles.container}>
      <Map position={position} setPosition={setPosition}></Map>
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
