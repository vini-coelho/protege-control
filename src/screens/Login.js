import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';

import Header from '../components/Header';
import Logo from '../assets/images/logo.png'
import Colors from '../styles/Colors';

export default () => {
    return (
        <View style={styles.container}>
            <View style={styles.image}>
                <Image resizeMode='contain' source={Logo}/>
            </View>
            <Text style={styles.title}>PROTEGE CONTROL</Text>
            <View style={styles.form}>
                <TextInput placeholderTextColor={Colors.yellow}
                style={styles.input} 
                placeholder='E-mail'/>

                <TextInput placeholderTextColor={Colors.yellow} 
                style={styles.input} 
                placeholder='Senha'
                secureTextEntry/>

                <Text style={styles.button}>LOGIN</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.main,
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        marginBottom: 10,
        borderBottomColor: Colors.yellow,
        borderBottomWidth: 1,
        fontFamily: 'Roboto',
        fontSize: 17
    },
    form: {
        backgroundColor: Colors.main,
        padding: 20,
        shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 1,
		shadowRadius: 6,

		elevation: 3,
    },
    button: {
        alignSelf: 'flex-end',
        color: Colors.yellow,
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 15
    },
    image: {
        alignSelf: "center",
        height: 180,
        width: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        alignSelf: 'center',
        fontSize: 25,
        color: Colors.yellow,
        fontFamily: 'Roboto-Light',
        fontWeight: 'bold'
    }
});