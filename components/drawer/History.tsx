import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, TextInput} from 'react-native';
import userModel from '../../models/user';
import Icon from 'react-native-vector-icons/Octicons';

export default function History({navigation}): any {
    const [history, setHistory] = useState([]);

        // Get balance for logged in user
        useEffect(() => {
            async function getHistory(): Promise<void> {
                const result = await userModel.getHistory();
                setHistory(result);
            };
            getHistory();
        }, []);

    
    return (
        <View>
            <Text>History</Text>
        </View>
    )
}