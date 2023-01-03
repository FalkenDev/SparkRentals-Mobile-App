import React from "react";
import { ScrollView, Image, Text, View, StyleSheet, StatusBar, Button, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';



export default function NavBar({navigation}) {
    function DrawerButton({navigation}) {
        return (
          <Pressable style={[styles.drawer, styles.shadowProp]} onPress={() => navigation.openDrawer()}> 
            <Icon 
            name='three-bars' 
            size={20} 
            color='black'
            />
          </Pressable>
        );
      };

      function HowToDrive({navigation}) {
        return (
            <Pressable style={[styles.info, styles.shadowProp]}>
                <Icon 
                    name='question' 
                    size={16} 
                    color='black'
                />
                <Text style={{marginLeft: 8}}>How to drive?</Text>
            </Pressable>
        )
      }

      function Drive({navigation}) {
        return (
            <Pressable style={[styles.drawer, styles.shadowProp]}> 
              <Icon 
              name='paper-airplane' 
              size={20} 
              color='black'
              />
            </Pressable>
          );
      }

    return (
        <View style={styles.container}>
            <DrawerButton navigation={navigation}/>
            <HowToDrive navigation={navigation}/>
            <Drive navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        position: 'absolute',
        // backgroundColor: 'red',
        // height: 60,
        justifyContent: 'space-evenly',
        width: '100%',
        flexDirection: 'row',
    },
    info: {
        // position: 'absolute',
        width: 250,
        height: 40, 
        // left: 50,
        backgroundColor: 'white',
        marginTop: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    drawer: {
        // position: 'absolute',
        width: 40,
        height: 40, 
        // left: 50,
        backgroundColor: 'white',
        marginTop: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    shadowProp: {
        elevation: 5,
        shadowColor: 'black'
      },
});