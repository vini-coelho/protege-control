import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../styles/Colors';

export default ({ title, description,senderName, date, onItemClick, onButtonClick }) => {

    function formatedDate(stringDate){

        const monthNames = [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", 
        "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ];

        const dt = new Date(stringDate),
        dia  = dt.getUTCDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (dt.getUTCMonth()+1).toString(),
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = dt.getUTCFullYear();

        return diaF+" de "+monthNames[dt.getMonth()]+" de "+anoF;
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onItemClick}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.info}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.commomText}>Por: </Text> 
                    <Text style={styles.sender}>{senderName}</Text>
                    </View>
                    <Text style={styles.date}>Manaus, {formatedDate(date)}</Text>
                </View>
            </View>
            <View style={styles.body}>
                <Text style={styles.commomText}>{description}</Text>
            </View>
            {onButtonClick && <>
                <TouchableOpacity style={styles.button} onPress={onButtonClick}><Text style={styles.buttonText}>Responder</Text></TouchableOpacity>
            </>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        marginBottom: 10
    },
    header:{
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray,
    },
    body:{
        padding: 15,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        color: Colors.dark,
        marginBottom: 5
    },
    commomText: {
        fontSize: 15,
        fontFamily: 'Roboto',
        color: Colors.main,
        textAlign: 'justify'
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    date: {
        color: Colors.yellow,
        fontFamily: 'Roboto',
        maxWidth: '50%',
        fontSize: 10,
        flex: 1,
        alignSelf: 'flex-end'
    },
    iconsContainer: {
        flexDirection: 'row',
    },
    sender: {
        fontSize: 15,
        fontFamily: 'Roboto-Bold',
        color: Colors.dark,
        maxWidth: 200,
    },
    button: {
        alignSelf: 'center',
        backgroundColor: Colors.yellow,
        color: Colors.white,
        padding: 5,
        borderRadius:5,
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 15
    },
    buttonText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
        color: Colors.white
    }

});