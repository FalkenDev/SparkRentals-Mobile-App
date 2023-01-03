import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet, StatusBar, Button, Pressable, Modal } from 'react-native';
import MapView, { Marker, Circle, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import React from 'react';
import mapModel from '../../models/map';
import {API_KEY} from "@env";
import config from '../../config/config.json';
import Icon from 'react-native-vector-icons/Octicons';
import { start } from 'react-native-compass-heading';


export default function HistoryMap({navigation, journey, modalVisible, setModalVisible}): any {
    const [startCoordinates, setStartCoordinates] = useState([]);
    const [endCoordinates, setEndCoordinates] = useState([]);

    console.log(journey);
    
    useEffect(() => {
        function setCoordinates() {
            if (modalVisible) {
                setStartCoordinates(journey['startPosition']);
                setEndCoordinates(journey['endPosition']);
            }
            
        };

        setCoordinates();
    })
    
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible)
        }}
        >
            <View style={styles.container}>
     
                <MapView
                    style={styles.map}
                    // region={{
                    //     // latitude: position.latitude? position.latitude : 0,
                    //     // longitude: position.longitude? position.longitude : 0,
                    //     // latitudeDelta: 0.03,
                    //     // longitudeDelta: 0.03,
                    // }}
                    userInterfaceStyle={'dark'}
                >
                <Marker 
                    coordinate={{latitude: startCoordinates[0], longitude: startCoordinates[1]}}
                />

                <Marker 
                    coordinate={{latitude: endCoordinates[0], longitude: endCoordinates[1]}}
                />
                </MapView>

                <View style={styles.infoContainer}>
                <Pressable style={[styles.backButton, styles.shadowProp]} onPress={() => setModalVisible(false)}>
                    <Icon 
                        name='arrow-left' 
                        size={25} 
                        color='black'
                    />
                </Pressable>
                    <View style={styles.info}>

                        <View style={styles.listInfo}>
                            <Text style={styles.infoTitle}>Journey started</Text>
                            <Text>{journey.date}</Text>
                        </View>

                        <View style={styles.listInfo}>
                            <Text style={styles.infoTitle}>Information about the trip</Text>
                            <Text>{mapModel.calcDistance(startCoordinates[0], startCoordinates[1], endCoordinates[0], endCoordinates[1])} km / {journey.totalMin} min </Text>

                            <Text> {journey.totalPrice} kr</Text>
                        </View>

                        <View style={styles.listInfo}>
                            <Text style={styles.infoTitle}>ID</Text>
                            <Text>{journey['_id']}</Text>
                        </View>

                        <View style={styles.listInfo}>
                            <Text style={styles.infoTitle}>Vehicle</Text>
                            <Text>{journey.scooterName}</Text>
                        </View>

                    </View>
                </View>
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '100%',
        alignItems: "center",
        width: '100%'
    },

    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    
    shadowProp: {
        elevation: 5,
        shadowColor: 'black'
      },

    infoContainer: {
        height: '100%',
        // flex: 1,
        // backgroundColor: 'red',
        justifyContent: 'flex-end',
        width: '100%'
    },

    info: {
        height: '45%',
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    listInfo: {
        // backgroundColor: 'red',
        height: '20%',
        borderBottomWidth: 1,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
        // marginBottom: 10
    },

    infoTitle: {
        fontWeight: '600',
    },

    backButton: {
        position: 'absolute',
        width: 40,
        height: 40, 
        left: 20,
        backgroundColor: 'white',
        top: 5,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

