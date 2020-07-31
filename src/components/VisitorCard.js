import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import Colors from '../styles/Colors';

export default ({ name, type, date, comments, arrivedAt, leftAt, status, car }) => {

    let typeText = '';
    let statusText = '';
    let statusIcon = '';

    if (type === 'delivery') typeText = 'Entregas';
    else if (type === 'service') typeText = 'Serviços'; 
    else if (type === 'visitor') typeText = 'Visitas'; 

    if (status === 'scheduled') {
        statusText = `Agendado para: ${formatedDate(date)}`;
        statusIcon = 'date-range';
    }
    else if (status === 'arrived') {
        statusText = `Entrada em: ${formatedDateTime(arrivedAt)}`;
        statusIcon = 'done';
    }
    else if (status === 'left') {
        statusText = `Saída em: ${formatedDateTime(leftAt)}`;
        statusIcon = 'done-all';
    }

    function formatedDateTime(date){
        return moment.utc(date).local().format("DD/MM/YYYY HH:mm:ss");
    }

    function formatedDate(date){
        return moment.utc(date).local().format("DD/MM/YYYY");
    }

    return (
        <View style={styles.container}>
                <Text style={[styles.title, {maxWidth: 200}]}>{name}</Text>
            <Text style={styles.description}>{comments}</Text>
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