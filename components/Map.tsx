import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet, StatusBar } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import React from 'react';
import mapModel from '../models/map';
import {API_KEY} from "@env";
import config from '../config/config.json';

export default function Map({API_KEY, position, setPosition}): any {
    const [locationMarker, setLocationMarker] = useState(null);
    const [highlight, setHighlight] = useState(null);    
        
    /**
     * Set user position
     */
    useEffect(() => {
        async function fetchPosition(): Promise<void> {
            const { status } = await Location.requestForegroundPermissionsAsync();

            const currentLocation = await Location.getCurrentPositionAsync({});

            const userCoordinates = {
                //latlang hardcoded for testing
                // latitude: currentLocation.coords.latitude,
                // longitude: currentLocation.coords.longitude
                latitude: 56.161013580817986,
                longitude: 15.587742977884904
            };

            setPosition(userCoordinates);

            setLocationMarker(<Marker
                coordinate={{
                    // latitude: currentLocation.coords.latitude,
                    // longitude: currentLocation.coords.longitude
                    latitude: 56.161013580817986,
                    longitude: 15.587742977884904
                }}
                title="My location"
                pinColor="blue"
                flat={false}
            />);
        };

        fetchPosition();

    }, []);


    /**
     * Set zones
     */
    // useEffect(() => {
    //     function highlightMap(): void {
    //         setHighlight(<Circle
    //             center={ {
    //                 latitude: 56.16506906899779,
    //                 longitude: 14.866441449341021
    //             } }
    //             radius = {200}
    //             strokeColor = {'rgba(34,139,34,0.5)'} 
    //             fillColor = {'rgba(34,139,34,0.5)'}
    //         />)
    //     }
    //     highlightMap();
    // }, []);    

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: position.latitude? position.latitude : 0,
                    longitude: position.longitude? position.longitude : 0,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
            >
                {locationMarker}
            </MapView>
        </View>
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
    }
});

