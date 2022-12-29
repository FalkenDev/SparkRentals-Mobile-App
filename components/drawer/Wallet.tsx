import { stopLocationUpdatesAsync } from 'expo-location';
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import userModel from '../../models/user';

export default function Wallet({navigation}): any {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        async function getBalance(): Promise<void> {
            const result = userModel.getBalance();


        };

        getBalance();
    });

    return (
        <View style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => navigation.navigate('MapNavigator')}>
                <Text>X</Text>
            </Pressable>
            <Text>Your Balance</Text>
            <Text>0 kr</Text>
            <Text>You should have at least SEK 30 in your wallet to start the journey</Text>
            <Text>Use prepaid card to deposit money</Text>
            <Pressable style={styles.prepaidButton} > 
                <Text style={styles.buttonText} > Use prepaid card </Text> 
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      height: '100%',
      width: '100%'
    },

    prepaidButton: {
        backgroundColor: 'cornflowerblue',
        width: '80%',
        height: 50,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 120,
    },

    buttonText: {
        color: 'white'
    },

    backButton: {
        position: 'absolute',
        width: 50,
        height: 50, 
        left: 20,
        backgroundColor: 'red',
        top: 50,
        borderRadius: 25
    }
});