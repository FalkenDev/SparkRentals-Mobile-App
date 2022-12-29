import { stopLocationUpdatesAsync } from 'expo-location';
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import userModel from '../../models/user';

export default function Wallet({navigation}): any {
    const [balance, setBalance] = useState(null);

    //Get balance for logged in user
    useEffect(() => {
        async function getBalance(): Promise<void> {
            const result = await userModel.getBalance();
            setBalance(result);
        };
        getBalance();
    });

    return (
        <View style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => navigation.navigate('MapNavigator')}>
                <Text>X</Text>
            </Pressable>
            <Text style={styles.title}>Your Balance</Text>
            <Text style={styles.balance}>{balance} kr</Text>
            <Text style={styles.info}>You should have at least SEK 30 in your wallet to start the journey</Text>
            
            <View style={styles.prepaidContainer}>
                <Text>Use prepaid card to deposit money</Text>
                <Pressable style={styles.prepaidButton} > 
                    <Text style={styles.buttonText} > Use prepaid card </Text> 
                </Pressable>
            </View>
            

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    //   backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    //   height: '75%',
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

    prepaidContainer: {
        width: '100%',
        height: '40%',
        alignItems: 'center',
        // flex: 2,
        backgroundColor: 'red',

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
    },

    title: {
        fontWeight: 'bold',
        fontSize: 20
    },

    balance: {
        fontWeight: 'bold',
        fontSize: 50
    },

    info: {
        fontSize: 15,
        width: '80%',
        color: 'gray',
        textAlign: 'center'
    },
});