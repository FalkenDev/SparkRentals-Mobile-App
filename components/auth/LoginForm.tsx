import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Pressable, StyleSheet, Image, StatusBar } from "react-native";
import authModel from "../../models/auth";
import EmailRegister from "./EmailRegister";
import CheckBox from 'expo-checkbox';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from "react-native-flash-message";

export default function LoginForm({navigation, setIsLoggedIn}) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    async function logIn() {
        const userLogin = {
            email: email,
            password: password
        };

        const loginUser = await authModel.login(userLogin);
        
        if (loginUser['type'] === 'danger') {
            showMessage({
                message: loginUser['title'],
                type: 'danger'
            })
        } else {
            showMessage({
                message: loginUser['message'],
                type: 'success'
            })
            setIsLoggedIn(true);
            
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo_dark.png')}></Image>
            <Text style={styles.formTitle}>Login</Text>


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
            keyboardType="visible-password"
            onChangeText={(content: string) => {
                setPassword(content)
            }}
            />

            <Pressable style={styles.emailRegister} onPress={logIn}>
            <Text>Login</Text>
            </Pressable>
   
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
        marginTop: 120,
    },

    emailRegisterGray: {
        backgroundColor: 'gray',
        width: '80%',
        height: 50,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 120,
    },

    greyedOut: {
        color: '#989898'
    },

    termsContainer: {
        width: '80%',
        alignItems: 'baseline',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    checkbox: {
        height: 30,
        width: 30,
    },

    termsText: {
        marginTop: 20,
        width: '80%'
    },

    logo: {
        marginTop: 60,
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

});