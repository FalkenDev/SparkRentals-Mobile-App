import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, TextInput, SafeAreaView} from 'react-native';
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
        <View style={styles.container}>
            <View style={styles.historyContainer}>
                <Text style={styles.title}>Ride History</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    historyContainer: {
        // backgroundColor: 'blue',
        height: '100%',
        marginTop: 50,
        alignItems: 'center'
    },

    title: {
        fontWeight: 'bold',
        fontSize: 20
    }
})