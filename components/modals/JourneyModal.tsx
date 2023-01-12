import React from "react";
import { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Pressable, StyleSheet, Image, StatusBar, Modal } from "react-native";
import GestureRecognizer from 'react-native-swipe-gestures';
import scooterModel from "../../models/scooter";
import { showMessage, hideMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/Octicons';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import MapView, { Marker, Circle, Polygon } from 'react-native-maps';


const batteryImages = {
    '100': require('../../assets/battery_100.png'),
    '75': require('../../assets/battery_75.png'),
    '50': require('../../assets/battery_50.png'),
    '25': require('../../assets/battery_25.png')
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

function getFormattedTime(time) {
    const currentTime = time;
    return currentTime;
};

export default function JourneyModal({navigation, scooter, journeyModal, setJourneyModal, toggleTimer, setToggleTimer}) {
    const [scooterName, setScooterName] = useState(null);
    const [scooterNumber, setScooterNumber] = useState(null);
    const [battery, setBattery] = useState(null);
    const [scooterPosition, setScooterPosition] = useState(null);
    const [scooterId, setScooterId] = useState(null);
    const markerRef = useRef(null);
    const [distance, setDistance] = useState(null);
    const [batteryPercentage, setBatteryPercentage] = useState(null);
    const [currentScooter, setCurrentScooter] = useState(null);



    async function getScooterInfo(): Promise<void> {            
        if (scooter) {            
            const title = scooter['name'].split('#');
            setScooterName(title[0]);
            setScooterNumber(title[1]);
            setBattery(getBattery(scooter['battery']));
            setScooterId(scooter['_id']);
            
            const getScooter = await scooterModel.getSpecificScooter(scooter['_id']);
            
            setCurrentScooter(getScooter);
            
            setScooterPosition(getScooter['scooter']['coordinates']);
            setBatteryPercentage(getScooter['scooter']['battery'].toFixed(1));                        
            setDistance(getScooter['scooter']['trip']['distance'].toFixed(2)); 
            
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {

            journeyModal ? getScooterInfo() : null;

            if (markerRef.current) {
                markerRef.current.animateMarkerToCoordinate(scooterPosition, 100);
            };
            
            
        }, 100);
        return () => clearInterval(interval);
      });


    async function stopJourney() {
        const result = await scooterModel.stopScooter(scooterId);

        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            showMessage({
                message: result['errors']['title'],
                type: 'danger',
                position: 'bottom'
            })

            return;
        };

        showMessage({
            message: result['message'],
            type: 'success',
            position: 'bottom'
        });

        setJourneyModal(!journeyModal)
    };



    return (
        <GestureRecognizer
            style={{flex: 1}}
        >
        <Modal
        animationType="slide"
        transparent={true}
        visible={journeyModal}
        onRequestClose={() => {
        }}

        >
            <View style={styles.modalContainer}></View>
            
            <MapView
                // ref={mapRef}
                style={styles.map}
                region={{
                    latitude: scooterPosition? scooterPosition['latitude'] : 56.161013580817986,
                    longitude: scooterPosition? scooterPosition['longitude'] : 15.587742977884904,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
                userInterfaceStyle={'dark'}
            >
                {scooterPosition ? 
                    <Marker
                        ref={markerRef}                        
                        coordinate={scooterPosition}
                        icon={require('../../assets/scooter_green.png')}
                        tappable={true}
                        onPress={() => {                           
                        }}
                        >
                    </Marker> 
                    : 
                    <View></View>
                }

            </MapView>

            <View style={[styles.modalMessage, styles.shadowProp]}>

                <View style={styles.titleContainer}>
                    <Image style={styles.scooterImage} source={require('../../assets/scooter_large_white.png')}></Image>

                    <View style={styles.textContainer}>
                        <Text style={styles.scooterTitle}> {scooterName} {scooterNumber}</Text>


                        <View style={styles.travelInfoContainer}>
                            <View style={styles.travelInfo}>
                                <Icon 
                                    name='location' 
                                    size={30} 
                                    color='black'
                                />

                                <Text>{distance} km</Text>
                            </View>
   


                            <View style={styles.travelInfo}>
                                <Icon 
                                    name='clock' 
                                    size={30} 
                                    color='black'
                                />
                                <Stopwatch start={toggleTimer}
                                    options={styles.timer}
                                    getTime={(time) => {                                        
                                        getFormattedTime(time);
                                    }} 
                                />

                            </View>
                        
                            <View style={styles.travelInfo}>
                                <Image style={styles.battery} source={batteryImages[`${battery}`]}></Image>

                                <Text>{batteryPercentage}%</Text>
                            </View>
                    </View>

                    </View>

                </View>
 
                <Pressable style={styles.tourButton} onPress={() => {
                    stopJourney();
                    setToggleTimer(false);
                }}>
                    <Text style={{color: 'black'}}>Finish the ride</Text>
                </Pressable>
                
            </View>
        </Modal>
    </GestureRecognizer>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(80, 80, 80, 0.6)',
        width: '100%',
        height: '100%',
        flex: 1,
    },

    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: '65%',
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
        width: '60%',
        marginBottom: 10,
        alignItems: 'center',
    },

    modalMessage: {
        backgroundColor: 'cornflowerblue',
        width: '100%',
        height: '35%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 10,
    },

    scooterTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 26,
        color: 'white'
    },
    
    battery: {
        marginLeft: 5,
        marginBottom: 15
    },

    scooterImage: {
        margin: 10
    },

    tourButton: {
        backgroundColor: 'white',
        width: '80%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    timer: {
        backgroundColor: 'white',
    },

    travelInfoContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        width: '100%',
        padding: 10,
        borderRadius: 25
    },

    travelInfo: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 75
    },

    shadowProp: {
        elevation: 5,
        shadowColor: 'black'
      },


})