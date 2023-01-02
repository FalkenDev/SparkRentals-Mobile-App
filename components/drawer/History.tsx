import { stopLocationUpdatesAsync } from 'expo-location';
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, TextInput, ScrollView} from 'react-native';
import userModel from '../../models/user';
import Icon from 'react-native-vector-icons/Octicons';
import mapModel from '../../models/map';

export default function Wallet({navigation}): any {
    const [history, setHistory] = useState([]);

        // Get balance for logged in user
        useEffect(() => {
            async function getHistory(): Promise<void> {
                const result = await userModel.getHistory();
                setHistory(result);
                console.log(history);

                
            };
            getHistory();
        }, []);

    return (
        <View style={styles.container}>

            <View style={[styles.infoContainer]}>
                <Pressable style={[styles.backButton, styles.shadowProp]} onPress={() => navigation.navigate('Map')}>
                    <Icon 
                        name='x' 
                        size={25} 
                        color='black'
                    />
                </Pressable>

                <Text style={styles.title}>Ride History</Text>
            </View>
            
            <ScrollView style={styles.prepaidContainer}>
                {history.map((h, index) => (
                <View style={styles.rideHistory}>

                    <View style={styles.primaryInfo}>
                        <Text style={styles.textDistance}>
                            {mapModel.calcDistance(h.startPosition[0], h.startPosition[1], h.endPosition[0], h.endPosition[1])} km / {h.totalMin} min 
                        </Text>
                        <Text style={styles.textCost}>{h.totalPrice} kr</Text>
                    </View>
                    
                    <View style={styles.secondaryInfo}>
                        <Text style={styles.textDate}>{h.date}</Text>
                    </View>
                </View>
                
                ))}

            </ScrollView>
            

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    //   backgroundColor: 'red',
      alignItems: 'center',
    //   justifyContent: 'space-evenly',
      height: '50%',
      width: '100%'
    },

    rideHistory: {
        // backgroundColor: 'red',
        width: '100%',
        flexDirection: 'column',
        marginBottom: 20,
        borderBottomWidth: 1,
        padding: 5,
        borderBottomColor: 'grey',
        // height: '100%'
        // justifyContent: 'space-around'
    },

    textDistance: {
        textAlign: 'left',
        fontWeight: '600',
        fontSize: 16,
    },

    textCost: {
        textAlign: 'right',
        fontWeight: '600',
        fontSize: 16
    },

    textDate: {
        width: '100%',
        color: 'grey'
    },



    primaryInfo: {
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row'
    },

    secondaryInfo: {
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 10
    },


    infoContainer: {
        width: '100%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        // backgroundColor: 'blue',

    },

    prepaidContainer: {
        width: '90%',
        height: '90%',
        // backgroundColor: 'red'
        // alignItems: 'center',
        // justifyContent: 'center',
        // padding: 20,
        // flex: 2,
        // backgroundColor: 'red',
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
        // borderColor: 'grey',
    },

    buttonText: {
        color: 'white'
    },

    backButton: {
        position: 'absolute',
        width: 40,
        height: 40, 
        left: 20,
        backgroundColor: 'white',
        top: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalCloseContainer: {
        width: '90%',
        alignItems: 'flex-end',
    },

    closeButton: {
        width: 25,
        height: 25, 
        backgroundColor: 'white',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
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

    prepaidInfo: {
        fontWeight: 'bold',
        fontSize: 18
    },

    shadowProp: {
        elevation: 5,
        shadowColor: 'black'
      },

    modalContainer: {
        backgroundColor: 'rgba(220, 220, 220, 0.6)',
        width: '100%',
        height: '100%',
        flex: 1,
    },
    
    modalMessage: {
        backgroundColor: 'white',
        width: '100%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },

    input: {
        // backgroundColor: 'red',
        width: '90%',
        marginBottom: 30,
        borderRadius: 10,
        height: 50,
        padding: 10,
        borderBottomWidth: 2,
        borderColor: 'gray'
    },
});