import { stopLocationUpdatesAsync } from 'expo-location';
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, TextInput} from 'react-native';
import userModel from '../../models/user';
import Icon from 'react-native-vector-icons/Octicons';

export default function Wallet({navigation}): any {
    const [balance, setBalance] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [prepaid, setPrepaid] = useState(null);

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


            <View style={[styles.infoContainer]}>
                <Pressable style={[styles.backButton, styles.shadowProp]} onPress={() => navigation.navigate('Map')}>
                    <Icon 
                        name='x' 
                        size={25} 
                        color='black'
                    />
                </Pressable>

                <Text style={styles.title}>Your Balance</Text>
                <Text style={styles.balance}>{balance} kr</Text>
                <Text style={styles.info}>You should have at least SEK 30 in your wallet to start the journey</Text>
            </View>
            
            <View style={styles.prepaidContainer}>
                <Text style={styles.prepaidInfo}>Use prepaid card to deposit money</Text>
                <Pressable style={[styles.prepaidButton, styles.shadowProp]} onPress={() => setModalVisible(true)}> 
                    <Text style={styles.buttonText} > Use prepaid card </Text> 
                </Pressable>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}></View>
                <View style={styles.modalMessage}>

                <View style={styles.modalCloseContainer}>

                    <Pressable style={[styles.closeButton, styles.shadowProp]} onPress={() => setModalVisible(false)}>
                        <Icon 
                            name='x' 
                            size={15} 
                            color='black'
                        />
                    </Pressable>

                </View>

                    <TextInput
                    placeholder="Enter prepaid card number"
                    style={styles.input}
                    keyboardType="email-address"
                    onChangeText={(content: string) => {
                        setPrepaid(content)
                    }}

                    onSubmitEditing={() => console.log(prepaid)
                    }
                    />
                </View>
            </Modal>
            

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

    prepaidButton: {
        backgroundColor: 'cornflowerblue',
        width: '90%',
        height: 50,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    infoContainer: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        // backgroundColor: 'blue',

    },

    prepaidContainer: {
        width: '90%',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 20,
        // flex: 2,
        // backgroundColor: 'red',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'grey',
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