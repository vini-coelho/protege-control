import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../styles/Colors';

export default ({ title, description }) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}> 
                <Text style={styles.date}>Manaus, 03 de Janeiro de 2020</Text>
                <View style={styles.iconsContainer}>
                    <Icon name='image' size={17} color={Colors.yellow}/>
                    <Icon name='attach-file' size={17} color={Colors.yellow}/>
                </View>
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light,
        padding: 15,
        borderRadius: 5,
        marginBottom: 10
    },
    title: {
        fontSize: 20,
        fontFamily: 'Roboto-Light',
        color: Colors.yellow,
        marginBottom: 5
    },
    description: {
        fontSize: 15,
        fontFamily: 'Roboto-Light',
        color: '#fff',
        textAlign: 'justify'
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    date: {
        color: '#fff',
        fontFamily: 'Roboto-Thin',
    },
    iconsContainer: {
        flexDirection: 'row',
    }
});