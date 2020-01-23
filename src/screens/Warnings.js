import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Colors from '../styles/Colors';

import Header from '../components/Header';
import Post from '../components/Warning';

export default ({ navigation }) => {
    return (
        <View style={styles.screen}>
            <Header iconRight='add'
            iconLeft='menu'
            onPressLeft={() => navigation.openDrawer()}
            title='Avisos'/>
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.scroll}>
                    <Post title='Manutenção da piscina principal'
                    description='Caros condôminos, a administração informa que no dia 23/02/2020 
                    será realizada manutenção 
                    preventiva da piscina principal do condomínio'/>
                    <Post title='Manutenção da piscina principal'
                    description='Caros condôminos, a administração informa que no dia 23/02/2020 
                    será realizada manutenção 
                    preventiva da piscina principal do condomínio'/>
                    <Post title='Manutenção da piscina principal'
                    description='Caros condôminos, a administração informa que no dia 23/02/2020 
                    será realizada manutenção 
                    preventiva da piscina principal do condomínio'/>
                    <Post title='Manutenção da piscina principal'
                    description='Caros condôminos, a administração informa que no dia 23/02/2020 
                    será realizada manutenção 
                    preventiva da piscina principal do condomínio'/>
                    <Post title='Manutenção da piscina principal'
                    description='Caros condôminos, a administração informa que no dia 23/02/2020 
                    será realizada manutenção 
                    preventiva da piscina principal do condomínio'/>
                    <Post title='Manutenção da piscina principal'
                    description='Caros condôminos, a administração informa que no dia 23/02/2020 
                    será realizada manutenção 
                    preventiva da piscina principal do condomínio'/>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.main,
    },
    scroll: {
        flex: 1,
        padding: 10
    },
});