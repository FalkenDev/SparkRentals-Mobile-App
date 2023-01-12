import React from 'react';
import { StyleSheet, Text, View, Pressable, Modal, TextInput} from 'react-native';
import userModel from '../../models/user';
import { showMessage, hideMessage } from "react-native-flash-message";

export default function DeleteModal({navigation, modalVisible, setModalVisible, setIsLoggedIn}) {

    async function deleteAccount(navigation) {
        const result = await userModel.deleteAccount();

        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            showMessage({
                message: result['errors']['title'],
                type: 'danger',
                position: 'bottom'
            })

            return;
        };

        showMessage({
            message: result['message'],
            type: 'danger',
            position: 'bottom'
        });

        setIsLoggedIn(false);
        navigation.navigate('Auth');
    }

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
                    <Text style={styles.title}>Are you sure you want to delete your account?</Text>

                    <Pressable style={[styles.prepaidButton]} onPress={() => {
                        deleteAccount(navigation)
                    }}>
                        <Text style={{color: 'white'}}>Yes, delete account</Text>
                    </Pressable>

                    <Pressable style={[styles.prepaidButton, {backgroundColor: 'grey'}]} onPress={() => {
                        setModalVisible(!modalVisible);
                    }}>
                        <Text style={{color: 'white'}}>No</Text>
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
        backgroundColor: 'tomato',
        width: '90%',
        height: 250,
        marginTop: 200,
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
        color: 'white'
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
})