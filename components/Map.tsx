import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet, StatusBar } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map({position, setPosition}): any {
    const [locationMarker, setLocationMarker] = useState(null);
    const [highlight, setHighlight] = useState(null);
    
    /**
     * Set user position
     */
    useEffect(() => {
        const fetchPosition = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            const currentLocation = await Location.getCurrentPositionAsync({});

            const userCoordinates = {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude
            };

            setPosition(userCoordinates);

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="My location"
                pinColor="blue"
                flat={false}
            />);
        };

        fetchPosition();

    }, []);

    useEffect(() => {
        const highlightMap = () => {
            setHighlight(<Circle
                center={ {
                    latitude: 56.16506906899779,
                    longitude: 14.866441449341021
                } }
                radius = {1000000000}
                fillColor = {'rgba(230,238,255,0.5)'}
            />)
        }
    }, []);

    console.log(highlight);
    

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: position.latitude? position.latitude : 0,
                    longitude: position.longitude? position.longitude : 0,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {locationMarker}

                <Circle
                center={ {
                    latitude: 56.16506906899779,
                    longitude: 14.866441449341021
                } }
                radius = {200}
                strokeColor = {'rgba(34,139,34,0.5)'} 
                fillColor = {'rgba(34,139,34,0.5)'}
                />

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

