import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, TextInput, Dimensions} from 'react-native';
import userModel from '../../models/user';
import authModel from '../../models/auth';
import Icon from 'react-native-vector-icons/Octicons';
import { showMessage, hideMessage } from "react-native-flash-message";
import DeleteModal from '../modals/DeleteModal';
const deviceHeight = Dimensions.get('window').height;


export default function Profile({navigation, setIsLoggedIn}): any {
    const [balance, setBalance] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [prepaid, setPrepaid] = useState(null);

    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [email, setEmail] = useState(null);
    const [phonenumber, setPhonenumber] = useState(null);

    //Get profile data for logged in user
    useEffect(() => {
        async function getUser(): Promise<void> {
            const result = await userModel.getProfile();
            
            const profile = result['user'];

            setFirstname(profile['firstName']);
            setLastname(profile['lastName']);
            setEmail(profile['email']);
            setPhonenumber(profile['phoneNumber']);

        };
        getUser();
    }, []);

    function setFirstLastName(name: string): void {
        const userName = name.split(' ');
        
        const firstName = userName[0];
        const lastName = userName[1];        

        setFirstname(firstName);
        setLastname(lastName);
    };

    async function logout(): Promise<void> {        
        await authModel.logout();
        setIsLoggedIn(false);
        navigation.navigate('Auth');
    };

    async function save() {
        // Prepare user data object
        const userData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            phonenumber: phonenumber
        };        

        const result = await userModel.updateUser(userData);

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
            type: 'success',
            position: 'bottom'
        });
    };

    return (
        <View style={styles.container}>


            <View style={[styles.infoContainer]}>
                
                <View style={styles.titleContainer}>
                
                    <Pressable style={[styles.backButton, styles.shadowProp]} onPress={() => navigation.navigate('Map')}>
                        <Icon 
                            name='x' 
                            size={25} 
                            color='black'
                        />
                    </Pressable>
                    
                    <Text style={styles.title}>Profile</Text>

                    <Pressable style={styles.saveButton} onPress={() => save()}>
                            <Text style={styles.saveText}>Save</Text>
                    </Pressable>

                </View>




                <View style={styles.inputContainer}>
                    

                    <TextInput
                        value={`${firstname} ${lastname}`}
                        style={styles.input}
                        onChangeText={(content: string) => {
                            setFirstLastName(content)
                        }}

                    />

                    <TextInput
                        value={email}
                        style={styles.input}
                        keyboardType="email-address"
                        onChangeText={(content: string) => {
                            setEmail(content);
                        }}
                    />


                    <TextInput
                        value={phonenumber}
                        style={styles.input}
                        keyboardType="phone-pad"
                        onChangeText={(content: string) => {
                            setPhonenumber(content);
                        }}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Pressable style={styles.prepaidButton} onPress={logout}>
                        <Text>Logout</Text>
                    </Pressable>

                    <Pressable style={[styles.prepaidButton, {backgroundColor: 'tomato'}]} onPress={() => {
                        setModalVisible(!modalVisible);
                    }}>
                        <Text>Delete account</Text>
                    </Pressable>
                </View>
                
            </View>
            
            <DeleteModal navigation={navigation} modalVisible={modalVisible} setModalVisible={setModalVisible} setIsLoggedIn={setIsLoggedIn}></DeleteModal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      height: '50%',
      width: '100%',

    },

    titleContainer: {
        width: '100%',
        flexDirection: 'row',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    prepaidButton: {
        backgroundColor: 'cornflowerblue',
        width: '90%',
        height: 50,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    saveButton: {
        width: 60,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    saveText: {
        color: 'cornflowerblue',
        fontSize: 18,
        fontWeight: '500'
    },

    inputContainer: {
        width: '100%',
        height: '65%',
        alignItems: 'center'
    },

    infoContainer: {
        width: '100%',
        height: deviceHeight ,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },


    prepaidContainer: {
        width: '90%',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'grey',
    },

    buttonText: {
        color: 'white'
    },

    backButton: {
        width: 40,
        height: 40, 
        backgroundColor: 'white',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
    },

    closeButton: {
        width: 25,
        height: 25, 
        backgroundColor: 'white',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontWeight: 'bold',
        fontSize: 20,
        width: '70%',
        textAlign: 'center'
    },

    balance: {
        fontWeight: 'bold',
        fontSize: 50
    },

    info: {
        fontSize: 15,
        width: '80%',
        color: 'gray',
        textAlign: 'center'
    },

    prepaidInfo: {
        fontWeight: 'bold',
        fontSize: 18
    },

    shadowProp: {
        elevation: 5,
        shadowColor: 'black'
      },

    modalContainer: {
        backgroundColor: 'rgba(220, 220, 220, 0.6)',
        width: '100%',
        height: '100%',
        flex: 1,
    },
    
    modalMessage: {
        backgroundColor: 'white',
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },

    input: {
        width: '90%',
        marginBottom: 30,
        borderRadius: 10,
        height: 50,
        padding: 10,
        borderBottomWidth: 2,
        borderColor: 'gray',
    },


});