import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Pressable, StyleSheet, Image } from "react-native";
import authModel from "../../models/auth";
import EmailRegister from "./EmailRegister";
export default function EmailForm() {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [phonenumber, setPhonenumber] = useState(null);
    const [accept, setAccepts] = useState(null);

    function test() {
        authModel.test();
        console.log(name);
    }

    console.log(name);
    

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo_dark.png')}></Image>
            <Text style={styles.formTitle}>Title</Text>

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
            />

            <TextInput
            placeholder="Password"
            style={styles.input}
            keyboardType="visible-password"
            />

            <TextInput
            placeholder="Phonenumber"
            style={styles.input}
            keyboardType='phone-pad'
            />

            <Text style={styles.termsText}>By registering, you agree to our terms and conditions and privacy policy.</Text>

            <Pressable style={styles.emailRegister} onPress={test}>
                <Text>Register</Text>
            </Pressable>

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

    termsText: {
        marginTop: 20,
        width: '80%'
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

});

// firstName

// lastName


// phoneNumber


// email


// password


// balance

// api_key