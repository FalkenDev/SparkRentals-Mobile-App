import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map({position, setPosition}): any {
    const [locationMarker, setLocationMarker] = useState(null);
    console.log(position);
    
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
            />);
        };

        fetchPosition();

    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: position.latitude? position.latitude : 0,
                    longitude: position.longitude? position.longitude : 0,
                    latitudeDelta: 4,
                    longitudeDelta: 4,
                }}
            >
                {locationMarker}
            </MapView>
            <Text>test</Text>
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