import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
export default ({ iconName, title }) => (
    <View style={styles.cardContainer}>
        <View style={styles.icon}>
            <Icon size={40} name={iconName}/>
        </View>
    <Text style={styles.label}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    cardContainer: {
        width: Dimensions.get('window').width/2 - 25,
        aspectRatio: 1,

        backgroundColor: '#ddd',
        borderRadius: 5,
        marginRight: 10,
        padding: 10,
        justifyContent: 'space-around',
        alignItems: 'center',

        shadowColor: 'black',
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    icon: {
        width: 66,
        height: 66,
        borderRadius: 33,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});