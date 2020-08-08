import React, { useEffect, useState } from 'react';
import { ScrollView, Image, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../styles/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { onSignOut } from '../auth';

export default CustomDrawerContentComponent = props => {

    const [ user, setUser ] = useState(null);

    useEffect(() => {
        async function getUser() {
            const user = JSON.parse(await AsyncStorage.getItem('USER'));

            setUser(user);
        }

        getUser();
    }, []);


    function mapUserType(type){
        switch (type) {
            case "user":
                return "Morador"
            case "admin":
                return "Portaria"
            case "root":
                return "Admin"
                
            default:
                return "Morador";
        }
    }

    return (
        (user) &&
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
                                <Text style={styles.place}>{mapUserType(user.type)}</Text>
                            </View>
                        </View>
                    </View>
                    {/* <Image style={styles.image} source={} /> */}
                    <View style={styles.body}>
                        <DrawerItems {...props} />
                        <TouchableOpacity style={styles.logoutContainer} onPress={async () => await onSignOut(props.navigation)}>
                            <Icon name='exit-to-app' size={25} color={Colors.light}></Icon>
                            <Text style={styles.logoutText}>Sair</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    image: {
        maxWidth: 300,
        marginRight: 5,
        alignSelf: 'center'
    },
    title: {
        fontFamily: 'Roboto-Light',
        textAlign: 'center',
        color: Colors.white,
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
        fontSize: 17,
        color:Colors.white
    },
    place: {
        marginTop: 2,
        fontFamily: 'Roboto-Light',
        fontSize: 12,
        color:Colors.white

    },
    info: {
        flexWrap: 'wrap',
        color:Colors.white

    },
    image: {
        height: 120,
        width: 120,
        resizeMode: 'contain'
    },
    body:{
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    logoutContainer: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    logoutText: {
        fontFamily: 'Roboto',
            fontWeight: 'normal',
            fontSize: 17,
            marginLeft: 30
    }
});