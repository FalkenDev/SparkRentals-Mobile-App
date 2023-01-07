import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Modal, Pressable } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Icon from 'react-native-vector-icons/Octicons';

export default function QrScanner({navigation, cameraVisible, setCameraVisible}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={cameraVisible}
        onRequestClose={() => {
        setCameraVisible(!cameraVisible);
        }}
    >
        <View style={[styles.container, styles.shadowProp]}>
            <Pressable style={[styles.backButton, styles.shadowProp]} onPress={() => setCameraVisible(!cameraVisible)}>
                <Icon 
                    name='x' 
                    size={25} 
                    color='black'
                />
            </Pressable>
            
            <Text style={styles.title}> Scan the QR-code </Text>

        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.viewFinder}
        />

        <Pressable style={[styles.cameraButton, styles.shadowProp]} onPress={() => setScanned(false)} >
            <Icon 
                name='screen-full' 
                size={24} 
                color='black'
            />
        </Pressable>
        </View>
    </Modal>

  );
}

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      width: '100%',
      alignItems: 'center',
      backgroundColor: 'white',
      height: '80%',
      top: '20%',
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25

    },

    viewFinder: {
        flex: 1,
        width: '70%',
    },


    shadowProp: {
        elevation: 5,
        shadowColor: 'black'
    },
    
    backButton: {
        position: 'absolute',
        width: 40,
        height: 40, 
        left: 20,
        backgroundColor: 'white',
        top: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
    },

    cameraButton: {
        // position: 'absolute',
        width: 60,
        height: 60, 
        // left: 20,
        backgroundColor: 'white',
        bottom: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        position: 'absolute',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 30
    },
})