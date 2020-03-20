import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../styles/Colors';

export default ({ title, description, date }) => {

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
        <View style={styles.container}>
            <View style={styles.info}> 
                <Text style={styles.date}>Manaus, {formatedDate(date)}</Text>
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