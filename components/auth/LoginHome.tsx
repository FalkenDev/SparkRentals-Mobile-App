import React from 'react';
import { ScrollView, Image, Text, View, StyleSheet, StatusBar, Dimensions, Pressable } from 'react-native';
// Get width and height of users display
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function Login({navigation}): any {

    async function googleLogin(): Promise<void> {
        console.log('google');
    };

    async function emailRegister(): Promise<void> {
        navigation.navigate('EmailRegister');
    }

    async function emailLogin(): Promise<void> {
        navigation.navigate('LoginForm');
    }
    return (
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Image style={styles.titleLogo} source={require('../../assets/logo_light_big.png')}/>
            </View>

            <View style={styles.imageContainer}>
                <Image style={styles.splash} source={require('../../assets/splash.jpg')}></Image>
            </View>

            <View style={styles.logInContainer}>
                
                <Pressable onPress={googleLogin} style={styles.googleLogin}>
                    <Image style={styles.googleIcon} source={require('../../assets/google.png')}></Image>
                    <Text style={styles.googleText}>Login/Register with Google</Text>
                </Pressable>

                <Pressable onPress={emailRegister} style={styles.emailRegister}>
                    <Text>Register with email</Text>
                </Pressable>

                <View style={styles.emailContainer}>
                <Text>Already have an account? </Text>
                <Pressable onPress={emailLogin}><Text style={styles.link}>Login with email</Text></Pressable>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%'
    },

    emailContainer: {
        flexDirection: 'row'
    },

    link: {
        color: 'blue'
    },

    splash: {
        flex: 1,
        height: undefined, 
        width: undefined
    },

    imageContainer: {
        position: 'absolute',
        width: deviceWidth * 1.1,
        height: deviceHeight * 1.1,
    },

    logInContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        height: deviceHeight * 0.25,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        zIndex: 2
    },

    googleLogin: {
        backgroundColor: '#1A1A1A',
        width: '80%',
        height: '20%',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    emailRegister: {
        backgroundColor: 'lightgray',
        width: '80%',
        height: '20%',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    googleText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10
    },

    googleIcon: {
        height: 20,
        width: 20
    },

    titleLogo: {
        width: 350,
        height: 100
    },

    logoContainer: {
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        top: 0,
        height: deviceHeight * 0.80,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
  });