import React from 'react';
import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet, StatusBar, Dimensions, Pressable } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import EmailForm from './EmailForm';

export default function EmailRegister({setToken, navigation, setIsLoggedIn}): any {

    return (
        <SafeAreaView>
            <EmailForm navigation={navigation} setToken={setToken} setIsLoggedIn={setIsLoggedIn}></EmailForm>
        </SafeAreaView>
    )
};