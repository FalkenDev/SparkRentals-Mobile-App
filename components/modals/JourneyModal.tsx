import { stopLocationUpdatesAsync } from "expo-location";
import React from "react";
import { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Pressable, StyleSheet, Image, StatusBar, Modal } from "react-native";
import mapModel from "../../models/map";
import GestureRecognizer from 'react-native-swipe-gestures';
import scooterModel from "../../models/scooter";
import { showMessage, hideMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/Octicons';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

export default function JourneyModal({navigation, scooter, journeyModal, setJourneyModal, toggleTimer, setToggleTimer}) {
    const [scooterName, setScooterName] = useState(null);
    const [scooterNumber, setScooterNumber] = useState(null);
    const [battery, setBattery] = useState(null);
    const [fixedRate, setFixedRate] = useState(null);
    const [scooterId, setScooterId] = useState(null);
    const [timer, setTimer] = useState(null);

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

    useEffect(() => {
        function getScooterInfo(): void {            
            if (scooter) {
                const title = scooter['name'].split('#');
                setScooterName(title[0]);
                setScooterNumber(title[1]);
                setBattery(getBattery(scooter['battery']));
                setScooterId(scooter['_id']);
            }
        }
        getScooterInfo();
    });


    async function stopJourney() {
        const result = await scooterModel.stopScooter(scooterId);

        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            showMessage({
                message: result['errors']['title'],
                type: 'danger'
            })

            return;
        };

        showMessage({
            message: result['message'],
            type: 'success'
        });

        setJourneyModal(!journeyModal)
    };

    function getFormattedTime(time) {
        const currentTime = time;
        return currentTime;
    };

    return (
        <GestureRecognizer
            style={{flex: 1}}
            // onSwipeDown={ () => setModalVisible(false) }
        >
        <Modal
        animationType="slide"
        transparent={true}
        visible={journeyModal}
        onRequestClose={() => {
            // setJourneyModal(!journeyModal)
        }}

        >
            <View style={styles.modalContainer}></View>


            <View style={styles.modalMessage}>
            {/* <View style={styles.swipeButton}></View> */}

                <View style={styles.titleContainer}>
                    <Image style={styles.scooterImage} source={require('../../assets/scooter_large.png')}></Image>

                    <View style={styles.textContainer}>
                        <Text style={styles.scooterTitle}> {scooterName} {scooterNumber}</Text>


                        <View style={styles.travelInfoContainer}>
                            <View style={styles.travelInfo}>
                                <Icon 
                                    name='location' 
                                    size={30} 
                                    color='black'
                                />

                                <Text>1.2 km</Text>
                            </View>
   


                            <View style={styles.travelInfo}>
                                <Icon 
                                    name='clock' 
                                    size={30} 
                                    color='black'
                                />
                                <Stopwatch start={toggleTimer}
                                    // reset={toggleTimer}
                                    options={styles.timer}
                                    // options={options}
                                    getTime={(time) => {                                        
                                        getFormattedTime(time);
                                    }} 
                                />

                            </View>
                        
                            <View style={styles.travelInfo}>
                                <Image style={styles.battery} source={batteryImages[`${battery}`]}></Image>

                                <Text>35 km</Text>
                            </View>
                    </View>

                    </View>

                </View>
 
                <Pressable style={styles.tourButton} onPress={() => {
                    stopJourney();
                    setToggleTimer(false);
                }}>
                    <Text style={{color: 'white'}}>Finish the ride</Text>
                </Pressable>
                
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
        width: '60%',
        marginBottom: 10,
        // padding: 0
        alignItems: 'center',
        // flexDirection: 'row'
    },

    modalMessage: {
        backgroundColor: 'white',
        width: '100%',
        height: '35%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 10,
        // flexDirection: 'row'
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },

    scooterTitle: {
        fontWeight: 'bold',
        marginBottom: 40,
        fontSize: 26,
        // backgroundColor: 'red',
        // width: '100%'
    },
    
    battery: {
        marginLeft: 5,
        // width: 58,
        // height: 25
        marginBottom: 15
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
        // marginBottom: 
        // marginTop: 120,
    },

    timer: {
        backgroundColor: 'white'
    },

    travelInfoContainer: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        justifyContent: 'space-evenly',
        width: '100%'
    },

    travelInfo: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'red',
        height: 75
        // width: '100%'
    },


})