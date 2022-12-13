import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet, StatusBar } from 'react-native';
import MapView, { Marker, Circle, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import React from 'react';
import mapModel from '../models/map';
import {API_KEY} from "@env";
import config from '../config/config.json';
import Scooter1 from '../assets/Scooter1.png';

export default function Map({API_KEY, position, setPosition}): any {
    const [locationMarker, setLocationMarker] = useState(null);
    const [highlight, setHighlight] = useState(null);    
    const [currentCity, setCurrentCity] = useState(null);
    const [zones, setZones] = useState([]);
    const [scooters, setScooters] = useState([]);
    
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
            
            mapModel.getClosestCity(API_KEY, position);

            setLocationMarker(<Marker
                coordinate={{
                    //latlang hardcoded for testing
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
     * Set city to city that is closest to user and zones for that city
     */
    useEffect(() => {
        async function setUpMap(): Promise<void> {
            const city = await mapModel.getClosestCity(API_KEY, position);
            
            
            // Set city that is closest to user
            setCurrentCity(city);
                        
            /**
             * Set zones on map
             * FIX: fillColor currently not working
             */
            const zones = mapModel.getZones(city);
            setZones(zones);


            /**
             * Get all scooters and create markers for them on the map
             */
            const result = await mapModel.getScooters(API_KEY, city); 
            const scooters = result['cityScooters'];
            setScooters(scooters);
            
        };
        setUpMap();
    }, []);




    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: position.latitude? position.latitude : 0,
                    longitude: position.longitude? position.longitude : 0,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                }}
                userInterfaceStyle={'dark'}
                // liteMode={true}
            >

                {locationMarker}

                {scooters.map((s, index) => 
                    <Marker
                        title={s['name']}
                        coordinate={s['coordinates']}
                        icon={Scooter1}
                        tappable={true}
                        key={index}
                        >
                    </Marker>
                )}
                {zones.map((z, index) => (                    
                    <Polygon 
                        coordinates={z['coordinates']}
                        strokeColor={z['zoneColor']}
                        strokeWidth={3}
                        fillColor={z['zoneColor']}
                        key={index}
                    />
                ))}
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

