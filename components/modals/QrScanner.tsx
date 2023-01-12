import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Modal, Pressable, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Icon from 'react-native-vector-icons/Octicons';
import scooterModel from '../../models/scooter';
import { showMessage, hideMessage } from "react-native-flash-message";

export default function QrScanner({navigation, cameraVisible, setCameraVisible, scooter, setModalVisible, currentCity, setCurrentScooter}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [code, setCode] = useState(null);

    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };

      getBarCodeScannerPermissions();
    }, []);

    async function handleBarCodeScanned({ type, data }) {
      setScanned(true);

      await startScooter(data);
    };

    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    async function startScooter(scooter): Promise<void> {
      // Check if QR code is a valid scooter
      const result = await scooterModel.checkIfValidScooter(scooter, currentCity);

      
      if (result) {
        showMessage({
          message: 'Scooter scanned!',
          type: 'success',
          position: 'bottom'

        });

        setCameraVisible(!cameraVisible);
        setModalVisible(true);
        setCurrentScooter(result);
      } else {
        showMessage({
          message: 'Not a scooter!',
          type: 'danger',
          position: 'center'
        })
      }

      
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
            
            <Text style={styles.title}>Scan the QR-code</Text>
            <TextInput
            placeholder="or enter code manually"
            style={styles.input}
            onChangeText={(content: string) => {
                setCode(content)
            }}
            onSubmitEditing={() => startScooter(code)}
            />
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
        width: 60,
        height: 60, 
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

    subTitle: {
      position: 'absolute',
      fontSize: 12,
      marginTop: 55,
      color: 'gray'
  },

    input: {
      width: '60%',
      marginBottom: 30,
      borderRadius: 10,
      height: 50,
      padding: 10,
      borderBottomWidth: 2,
      borderColor: 'gray',
      marginTop: 60,
      textAlign: 'center'
    }
})