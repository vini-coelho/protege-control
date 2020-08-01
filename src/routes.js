import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from './styles/Colors';
import CustomDrawer from './styles/CustomDrawer';

import Home from './screens/Home/Home';
import Posts from './screens/Posts/Posts';
import Login from './screens/Login/Login';
import Visitors from './screens/visitor/Visitors';
import { createStackNavigator } from 'react-navigation-stack';

export const VisitorStack = createStackNavigator({
    Visitors:  {
        screen: Visitors,
        navigationOptions:{
            headerShown: false
        }},
})

const LoggedInAsUser = createDrawerNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Página Inicial',
            drawerIcon: ({ tintColor }) => 
            <Icon name='home' size={25} color={tintColor}/>
        }
    },
    Alerts: {
        screen: Posts,
        navigationOptions: {
            title: 'Avisos',
            drawerIcon: ({ tintColor }) => 
            <Icon name='notifications' size={25} color={tintColor}/>
        }
    },
    Visitors: {
        screen: VisitorStack,
        navigationOptions: {
            title: 'Visitantes',
            drawerIcon: ({ tintColor }) => 
            <Icon name='directions-walk' size={25} color={tintColor}/>
        }
    },
    CheckIn: {
        screen: Visitors,
        navigationOptions: {
            title: 'Check-In',
            drawerIcon: ({ tintColor }) => 
            <Icon name='directions-walk' size={25} color={tintColor}/>
        }
    },
    CheckOut: {
        screen: Visitors,
        navigationOptions: {
            title: 'Check-Out',
            drawerIcon: ({ tintColor }) => 
            <Icon name='directions-walk' size={25} color={tintColor}/>
        }
    },
}, {
    initialRouteName: 'Home',
    contentComponent: CustomDrawer,
    drawerBackgroundColor: Colors.white,
    contentOptions: {
        labelStyle: {
            fontFamily: 'Roboto',
            fontWeight: 'normal',
            fontSize: 17
        },
        inactiveTintColor: Colors.dark,
        inactiveBackgroundColor: Colors.white,
        activeTintColor: Colors.dark,
        activeBackgroundColor: Colors.white
    }
});


export const createRootNavigator = (signedIn = false, userType) => {
    let initialRouteName = '';

    if (signedIn === false) initialRouteName = 'LoggedOut';
    else {
        if (userType === 'root') initialRouteName = 'LoggedInAsRoot';
        else if (userType === 'admin') initialRouteName = 'LoggedInAsAdmin';
        else initialRouteName = 'LoggedInAsUser';
    }
    
    const mainRoute = createSwitchNavigator({
        // LoggedInAsAdmin,
        // LoggedInAsRoot,
        LoggedInAsUser,
        LoggedOut: Login
    },
    {
        initialRouteName
    });

    return createAppContainer(mainRoute);
}