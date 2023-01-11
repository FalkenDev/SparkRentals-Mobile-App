import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Pressable, StyleSheet, Image, StatusBar } from "react-native";
import authModel from "../../models/auth";
import EmailRegister from "./EmailRegister";
import CheckBox from 'expo-checkbox';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from "react-native-flash-message";
import TermsModal from "../modals/TermsModal";

export default function EmailForm({setToken, navigation, setIsLoggedIn}) {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [phonenumber, setPhonenumber] = useState(null);
    const [accept, setAccepts] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [termsVisible, setTermsVisible] = useState(false);

    async function createUser() {

        const userName = name.split(' ');
        const firstName = userName[0];
        const lastName = userName[1];

        // Check if email is valid
        if (!(checkEmail(email))) {
            showMessage({
                message: 'Invalid email',
                type: 'danger',
                position: 'bottom'
            })
        } else {
            
            // Prepare user object
            const user = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                phoneNumber: phonenumber,
                balance: 1.2
            };

            // Register user
            const result = await authModel.register(user);

            // Check if registration successful
            if (result['type'] === "success") {
                logIn();
            }

            showMessage({
                message: result['title'],
                description: result['message'],
                type: result['type'],
                position: 'bottom'

            });


        };
    };

    async function logIn() {
        const userLogin = {
            email: email,
            password: password
        };

        const loginUser = await authModel.login(userLogin);
        if (Object.prototype.hasOwnProperty.call(loginUser, 'errors')) {
            showMessage({
                message: loginUser['errors']['title'],
                type: 'danger',
                position: 'bottom'
            })
        } else {
            setToken(loginUser['token']);
            setIsLoggedIn(true);
        }
    };


    function checkEmail(email: string): Boolean {
        return authModel.checkEmail(email);
    };

    function checkAlert() {
        showMessage({
            message: 'You must agree to terms to register',
            type: 'danger',
            position: 'bottom'
        });
    };    

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo_dark.png')}></Image>
            <Text style={styles.formTitle}>Register</Text>

            <TextInput
            placeholder="Firstname Lastname"
            style={styles.input}
            onChangeText={(content: string) => {
                setName(content)
            }}
            />

            <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            onChangeText={(content: string) => {
                setEmail(content);
            }}
            />

            <TextInput
            placeholder="Password"
            style={styles.input}
            keyboardType='numbers-and-punctuation'
            secureTextEntry={true}
            onChangeText={(content: string) => {
                setPassword(content)
            }}
            />

            <TextInput
            placeholder="Phonenumber"
            style={styles.input}
            keyboardType='phone-pad'
            onChangeText={(content: string) => {
                setPhonenumber(content)
            }}
            />

            
            <View style={styles.termsContainer}>
                <CheckBox
                    style={styles.checkbox}
                    disabled={false}
                    value={accept}
                    color={'cornflowerblue'}
                    onValueChange={() => {
                        setAccepts((accept ? false : true));
                    }}
                >

                </CheckBox>
                
                <View style={styles.termsTextContainer}>
                    <Text style={styles.termsText}>By registering, you agree to our </Text> 
                    <Pressable onPress={() => {
                        setModalVisible(!modalVisible);
                        setTermsVisible(true);
                    }}>
                        <Text style={[styles.termsText, {color: 'blue'}]}>terms and conditions </Text> 
                    </Pressable>
                    <Text style={styles.termsText}>and </Text> 

                    <Pressable onPress={() => {
                        setModalVisible(!modalVisible);
                        setTermsVisible(false);
                    }}>
                        <Text style={[styles.termsText, {color: 'blue'}]}>privacy policy.</Text>
                    </Pressable>
                </View>
                
            </View>
            
            {accept ? 
                <Pressable style={styles.emailRegister} onPress={createUser}>
                <Text>Register</Text>
                </Pressable>
            :
                <Pressable style={styles.emailRegisterGray} onPress={checkAlert}>
                <Text style={styles.greyedOut}>Register</Text>
                </Pressable>
            }
        <TermsModal navigation={navigation} modalVisible={modalVisible} setModalVisible={setModalVisible} termsVisible={termsVisible}/>
        <FlashMessage position={'top'}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '100%',
        alignItems: "center",
        width: '100%',
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

    emailRegister: {
        backgroundColor: 'cornflowerblue',
        width: '80%',
        height: 50,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },

    emailRegisterGray: {
        backgroundColor: 'gray',
        width: '80%',
        height: 50,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },

    greyedOut: {
        color: '#989898'
    },

    termsContainer: {
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    checkbox: {
        height: 30,
        width: 30,
    },

    termsText: {
        // marginTop: 20,
        // width: '80%'
    },

    logo: {
        marginTop: 20,
        // backgroundColor: 'red'
    },

    formTitle: {
        fontSize: 48,
        // backgroundColor: 'red',
        width: '90%',
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 10
    },

    termsTextContainer: {
        width: '80%',
        flexDirection: 'row',
        // backgroundColor: 'green',
        flexWrap: 'wrap',
    },
});

// firstName

// lastName


// phoneNumber


// email


// password


// balance

// api_key