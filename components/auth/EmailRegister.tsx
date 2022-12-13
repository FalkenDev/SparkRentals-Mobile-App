import React from 'react';
import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet, StatusBar, Dimensions, Pressable } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import EmailForm from './EmailForm';

export default function EmailRegister(): any {

    return (
        <SafeAreaView>
            <EmailForm></EmailForm>
        </SafeAreaView>
    )
};