import React from 'react';
import { StyleSheet, Text, View, Pressable, Modal, TextInput} from 'react-native';

export default function HowModal({navigation, modalVisible, setModalVisible}) {

    return (
        <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
        >
            <View style={styles.modalContainer}>

                <View style={[styles.messageContainer, styles.shadowProp]}>
                    <Text style={styles.title}>How to drive</Text>

                    <View style={styles.textContainer}>
                        <Text style={styles.text}>1. Add balance to your wallet</Text>
                        <Text style={styles.text}>2. Select a scooter on the map</Text>
                        <Text style={styles.text}>3. Press 'Start Tour' to start driving</Text>
                        <Text style={styles.text}>4. Press 'Stop Tour' to stop driving</Text>
                        <Text style={styles.text}>P.S. Parking in certain zones can give you a discount!</Text>
                    </View>
                   



                    <Pressable style={[styles.prepaidButton, {backgroundColor: 'white'}]} onPress={() => {
                        setModalVisible(!modalVisible);
                    }}>
                        <Text style={{color: 'black'}}>OK</Text>
                    </Pressable>


                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        height: '100%', 
        width: '100%', 
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        position:'absolute',
        alignItems: 'center'
    },

    messageContainer: {
        backgroundColor: 'cornflowerblue',
        width: '90%',
        height: 350,
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    shadowProp: {
        elevation: 5,
        shadowColor: 'black'
    },

    title: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        textAlign: 'left',
        width: '80%'
    },

    prepaidButton: {
        backgroundColor: 'black',
        width: '90%',
        height: 50,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    text: {
        textAlign: 'left',
        width: '100%',
        fontSize: 16
    },

    textContainer: {
        width: '80%',
        height: 150,
        justifyContent: 'space-evenly',
        marginTop: 10
    }
})