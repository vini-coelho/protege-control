import React from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../styles/Colors';
import CustomDrawer from '../styles/CustomDrawer';

import Home from '../screens/Home';
import Warnings from '../screens/Warnings';
import Login from '../screens/Login';

const mainDrawer = createDrawerNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Página Inicial',
            drawerIcon: ({ tintColor }) => <Icon name='home' size={25} color={tintColor}/>
        }
    },
    Alerts: {
        screen: Warnings,
        navigationOptions: {
            title: 'Avisos',
            drawerIcon: ({ tintColor }) => <Icon name='notifications' size={25} color={tintColor}/>
        }
    },
    Documents: {
        screen: Login,
        navigationOptions: {
            title: 'Arquivos',
            drawerIcon: ({ tintColor }) => <Icon name='folder' size={25} color={tintColor}/>
        }
    }
}, {
    initialRouteName: 'Documents',
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

const AppContainer = createAppContainer(mainDrawer);

export default () => (
    <View style={{ flex: 1 }}>
      <AppContainer />
    </View>
);