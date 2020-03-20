import React, { useEffect, useState } from 'react';
import { ScrollView, Image, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';

import Colors from '../styles/Colors';

export default CustomDrawerContentComponent = props => {

    const [ user, setUser ] = useState(null);
    const [ cond, setCond ] = useState(null);

    useEffect(() => {
        async function getUser() {
            const user = JSON.parse(await AsyncStorage.getItem('USER'));
            const cond = JSON.parse(await AsyncStorage.getItem('USER_COND'));

            setUser(user);
            setCond(cond);
        }

        getUser();
    }, []);

    return (
        (user && cond) &&
            <ScrollView>
                <SafeAreaView
                    style={styles.container}
                    forceInset={{ top: 'always', horizontal: 'never' }}
                >
                    <View style={styles.header}>
                        {/* <Image style={styles.image} source={Logo}/>
                        <Text style={styles.title}>PROTEGE CONTROL</Text> */}
                        <View style={styles.profile}>
                            <View style={styles.profilePic}></View>
                            <View style={styles.info}>
                                <Text style={styles.name}>{user.name}</Text>
                                <Text style={styles.place}>{cond.name}</Text>
                                <Text style={styles.place}>Ap. {user.apartment}, Torre {user.tower}</Text>
                            </View>
                        </View>
                    </View>
                    {/* <Image style={styles.image} source={} /> */}
                    <DrawerItems {...props} />
                </SafeAreaView>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        maxWidth: 300,
        marginRight: 5,
        alignSelf: 'center'
    },
    title: {
        fontFamily: 'Roboto-Light',
        textAlign: 'center',
        color: Colors.main,
        fontSize: 18,
        marginBottom: 20
    },
    header: {
        padding: 15,
        paddingTop: 30,
        backgroundColor: Colors.yellow,
        alignItems: 'flex-start'
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    profilePic: {
        height: 70,
        width: 70,
        borderRadius: 35,
        backgroundColor: Colors.light,
        marginRight: 15
    },
    name: {
        fontFamily: 'Roboto-Bold',
        fontSize: 17
    },
    place: {
        marginTop: 2,
        fontFamily: 'Roboto-Light',
        fontSize: 12,
    },
    info: {
        flexWrap: 'wrap'

    },
    image: {
        height: 120,
        width: 120,
        resizeMode: 'contain'
    }
});