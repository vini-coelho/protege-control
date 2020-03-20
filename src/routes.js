import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from './styles/Colors';
import CustomDrawer from './styles/CustomDrawer';

import Home from './screens/Home';
import Posts from './screens/Posts';
import Login from './screens/Login';
import Visitors from './screens/Visitors';

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
    // Documents: {
    //     screen: ,
    //     navigationOptions: {
    //         title: 'Arquivos',
    //         drawerIcon: ({ tintColor }) => 
    //         <Icon name='folder' size={25} color={tintColor}/>
    //     }
    // },
    Visitors: {
        screen: Visitors,
        navigationOptions: {
            title: 'Visitantes',
            drawerIcon: ({ tintColor }) => 
            <Icon name='directions-walk' size={25} color={tintColor}/>
        }
    }
}, {
    initialRouteName: 'Home',
    contentComponent: CustomDrawer,
    drawerBackgroundColor: Colors.main,
    contentOptions: {
        labelStyle: {
            fontFamily: 'Roboto-Thin',
            fontWeight: 'normal',
            fontSize: 17
        },
        inactiveTintColor: Colors.yellow,
        inactiveBackgroundColor: Colors.main,
        activeTintColor: Colors.yellow,
        activeBackgroundColor: Colors.light
    }
});

// const LoggedOut = createSwitchNavigator({
//     Login: {
//         screen: Login
//     }
// });

// const LoggedInAsRoot = createDrawerNavigator({});

// const LoggedInAsAdmin = createDrawerNavigator({});

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