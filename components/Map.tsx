import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet, StatusBar, Button, Pressable, InteractionManagerStatic } from 'react-native';
import MapView, { Marker, Circle, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import React from 'react';
import mapModel from '../models/map';
import scooterModel from '../models/scooter';
import {API_KEY} from "@env";
import config from '../config/config.json';
import Icon from 'react-native-vector-icons/Octicons';
import ScooterModal from './modals/ScooterModal';
import NavBar from './drawer/NavBar';
import ZoneModal from './modals/ZoneModal';
import ScanScreen from './modals/QrScanner';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QrScanner from './modals/QrScanner';
import JourneyModal from './modals/JourneyModal';

const marker = require('../assets/scooter_white.png');
const selectedMarker = require('../assets/scooter_blue.png');

function markerIcon(index, selected) {
    if (index === selected) {
        return selectedMarker;
    }
    return marker;
};

function DrawerButton({navigation}) {
    return (
      <Pressable style={[styles.drawer, styles.shadowProp]} onPress={() => navigation.openDrawer()}> 
        <Icon 
        name='three-bars' 
        size={30} 
        color='black'
        />
      </Pressable>
    );
};

export default function Map({navigation, API_KEY, position, setPosition, token}): any {
    const [locationMarker, setLocationMarker] = useState(null);
    const [currentCity, setCurrentCity] = useState(null);
    const [zones, setZones] = useState([]);
    const [scooters, setScooters] = useState([]);
    const [currentScooter, setCurrentScooter] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [zoneModalVisible, setZoneModalVisible] = useState(false);
    const [currentZone, setCurrentZone] = useState(null);
    const [cameraVisible, setCameraVisible] = useState(false);
    const [journeyModal, setJourneyModal] = useState(false);
    const [toggleTimer, setToggleTimer] = useState(false);
    const [markerSelected, setMarkerSelected] = useState(null);
        
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
            
            mapModel.getClosestCity(position);

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
            const city = await mapModel.getClosestCity(position);
            
            
            // Set city that is closest to user
            setCurrentCity(city);
                        
            /**
             * Set zones on map
             */
            const zones = mapModel.getZones(city);
            setZones(zones);
            
        };
        setUpMap();
    }, []);

    /**
     * Get scooters for current city,
     * Updated every 5 seconds
     */
    useEffect(() => {
        const interval = setInterval(() => {

            // Get scooters
            async function getScooters() {
                const city = await mapModel.getClosestCity(position);

                const result = await scooterModel.getScooters(API_KEY, city); 

                const scooters = result['cityScooters'];
                const sortedScooters = scooterModel.sortAvailableScooters(scooters);
                setScooters(sortedScooters);
            };

      
            getScooters();

        }, 5000);
        return () => clearInterval(interval);
      }, []);


    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: position.latitude? position.latitude : 56.161013580817986,
                    longitude: position.longitude? position.longitude : 15.587742977884904,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                }}
                userInterfaceStyle={'dark'}
            >
                {locationMarker}

                {scooters.map((s, index) => 
                    <Marker
                        coordinate={s['coordinates']}
                        icon={markerIcon(index, markerSelected)}
                        tappable={true}
                        key={index}
                        onPress={() => {
                            setCurrentScooter(s);
                            setModalVisible(true);
                            setMarkerSelected(index);                            
                        }}
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
                        tappable={true}
                        onPress={() => {
                            setCurrentZone(z)
                            setZoneModalVisible(true)                            
                        }}
                    />
                ))}
            </MapView>

            <ScooterModal navigation={navigation} scooter={currentScooter} modalVisible={modalVisible} currentCity={currentCity} setModalVisible={setModalVisible} setJourneyModal={setJourneyModal} setToggleTimer={setToggleTimer} position={position}/> 

            <ZoneModal navigation={navigation} zone={currentZone} zoneModalVisible={zoneModalVisible} setZoneModalVisible={setZoneModalVisible} />
            
 
            <JourneyModal navigation={navigation} scooter={currentScooter} journeyModal={journeyModal} setJourneyModal={setJourneyModal} toggleTimer={toggleTimer} setToggleTimer={setToggleTimer}/>

            <Pressable onPress={() => {setCameraVisible(true)}} style={styles.googleLogin}>
                    <Icon 
                        name='screen-full' 
                        size={15} 
                        color='white'
                    />
                    <Text style={styles.googleText}>Scan to unlock</Text>
            </Pressable>

            <NavBar navigation={navigation} />
            <QrScanner navigation={navigation} cameraVisible={cameraVisible} setCameraVisible={setCameraVisible}/>
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
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    shadowProp: {
        elevation: 5,
        shadowColor: 'black'
    },

    googleLogin: {
        backgroundColor: '#1A1A1A',
        width: '65%',
        height: 45,
        borderRadius: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },

    googleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 10
    },

    googleIcon: {
        height: 20,
        width: 20
    }
});

