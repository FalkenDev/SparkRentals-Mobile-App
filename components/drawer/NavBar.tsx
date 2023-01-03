import React from "react";
import { ScrollView, Image, Text, View, StyleSheet, StatusBar, Button, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';



export default function NavBar({navigation}) {
    function DrawerButton({navigation}) {
        return (
          <Pressable style={[styles.drawer, styles.shadowProp]} onPress={() => navigation.openDrawer()}> 
            <Icon 
            name='three-bars' 
            size={30} 
            color='black'
            />
          </Pressable>
        );
      };

      function HowToDrive({navigation}) {
        return (
            <Pressable style={[styles.info, styles.shadowProp]}>
                <Text>How to drive?</Text>
            </Pressable>
        )
      }

      function Drive({navigation}) {
        return (
            <Pressable style={[styles.drawer, styles.shadowProp]}> 
              <Icon 
              name='paper-airplane' 
              size={30} 
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
        height: 50, 
        // left: 50,
        backgroundColor: 'white',
        marginTop: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },

    drawer: {
        // position: 'absolute',
        width: 50,
        height: 50, 
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