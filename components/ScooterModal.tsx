import { stopLocationUpdatesAsync } from "expo-location";
import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Pressable, StyleSheet, Image, StatusBar, Modal } from "react-native";
import mapModel from "../models/map";
import GestureRecognizer from 'react-native-swipe-gestures';

export default function ScooterModal({navigation, scooter, modalVisible, setModalVisible, currentCity}) {
    const [scooterName, setScooterName] = useState(null);
    const [scooterId, setScooterId] = useState(null);
    const [battery, setBattery] = useState(null);
    const [fixedRate, setFixedRate] = useState(null);
    const [timeRate, setTimeRate] = useState(null);


    const batteryImages = {
        '100': require('../assets/battery_100.png'),
        '75': require('../assets/battery_75.png'),
        '50': require('../assets/battery_50.png'),
        '25': require('../assets/battery_25.png')
    }

    function getBattery(batteryPercentage) {
        if (batteryPercentage >= 75) {
            return '100'
        } else if (batteryPercentage >= 50) {
            return '75'
        } else if (batteryPercentage >= 25) {
            return '50'
        } else {
            return '25'
        }
    };

    useEffect(() => {
        function getScooterInfo(): void {            
            if (scooter) {
                const title = scooter['name'].split('#');
                setScooterName(title[0]);
                setScooterId(title[1]);
                setBattery(getBattery(scooter['battery']));

                setFixedRate(currentCity['taxRates']['fixedRate']);
                setTimeRate(currentCity['taxRates']['timeRate']);
                // console.log(currentCity['taxRates']);
                
            }
        }
        getScooterInfo();
    });


    // console.log(scooter);
    
    return (
        <GestureRecognizer
            style={{flex: 1}}
            onSwipeDown={ () => setModalVisible(false) }
        >
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible)
        }}

        >
            <View style={styles.modalContainer}></View>


            <View style={styles.modalMessage}>
            <View style={styles.swipeButton}></View>

                <View style={styles.titleContainer}>
                    <Image style={styles.scooterImage} source={require('../assets/scooter2.png')}></Image>

                    <View style={styles.textContainer}>
                        <Text style={styles.scooterTitle}> {scooterName} {scooterId}</Text>
                        <Image style={styles.battery} source={batteryImages[`${battery}`]}></Image>
                    </View>

                </View>
 
                <Pressable style={styles.tourButton} >
                    <Text style={{color: 'white'}}>Start tour</Text>
                </Pressable>

                <Text style={{color: 'grey'}}> {fixedRate} kr unlocking + {timeRate} kr / min. </Text>
                
            </View>
        </Modal>
    </GestureRecognizer>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        // backgroundColor: 'rgba(80, 80, 80, 0.6)',
        width: '100%',
        height: '100%',
        flex: 1,
    },

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 30
    },

    swipeButton: {
        width: '25%',
        height: 5,
        backgroundColor: 'lightgrey',
        borderRadius: 25
    },

    textContainer: {
        width: '45%',
        marginBottom: 10,
        // padding: 0
        // alignItems: 'center'
        // flexDirection: 'row'
    },

    modalMessage: {
        backgroundColor: 'white',
        width: '100%',
        height: '30%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10
        // flexDirection: 'row'
        // borderRadius: 25
    },

    scooterTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 16
    },
    
    battery: {
        marginLeft: 5,
        // width: 15,
        // height: 28
    },

    scooterImage: {
        margin: 10
    },

    tourButton: {
        backgroundColor: 'cornflowerblue',
        width: '80%',
        height: 50,
        borderRadius: 10,
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
        // marginTop: 120,
    },
})