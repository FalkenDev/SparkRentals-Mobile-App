import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet, StatusBar, Button, Pressable } from 'react-native';
import MapView, { Marker, Circle, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import React from 'react';
import mapModel from '../models/map';
import scooterModel from '../models/scooter';
import {API_KEY} from "@env";
import config from '../config/config.json';

export default function Map({navigation, API_KEY, position, setPosition, token}): any {
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

            // if (status !== 'granted') {
            //     setErrorMessage('Permission to access location was denied');
            //     return;
            // }

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
            const result = await scooterModel.getScooters(API_KEY, city); 
            const scooters = result['cityScooters'];
            const sortedScooters = scooterModel.sortAvailableScooters(scooters);
            console.log(sortedScooters);
            
            setScooters(sortedScooters);
            
        };
        setUpMap();
    }, []);


    function DrawerButton({navigation}) {
        return (
          <Pressable style={styles.drawer} onPress={() => navigation.openDrawer()}> 
            <Text> Drawer </Text> 
          </Pressable>
        );
      }

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
                        description={`Charge ${s['battery']}% ${s['status']}`}
                        coordinate={s['coordinates']}
                        icon={require('../assets/Scooter1.png')}
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
            <DrawerButton navigation={navigation}/>
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
    },

    drawer: {
        position: 'absolute',
        width: 50,
        height: 50, 
        left: 50,
        backgroundColor: 'white',
        marginTop: 50,
        borderRadius: 25
    }
});

