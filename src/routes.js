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
import { Dwellers } from './screens/Dwellers';
import { NewDweller } from './screens/NewDweller';
import { UpdatePassword } from './screens/UpdatePassword';
import { PostDetail } from './screens/PostDetail';
import { NewPost } from './screens/NewPost';
import { CheckIn } from './screens/CheckIn';
import { NewCheckIn } from './screens/NewCheckIn';

export const VisitorStack = createStackNavigator({
    Visitors:  {
        screen: Visitors,
        navigationOptions:{
            headerShown: false
        }},
})

export const DwellerStack = createStackNavigator({
    Dwellers:  {
        screen: Dwellers,
        navigationOptions:{
            headerShown: false
        }},
    NewDweller: {
        screen: NewDweller,
        navigationOptions:{
            headerShown: false
        }}
})

export const PostStack = createStackNavigator({
    Alerts:  {
        screen: Posts,
        navigationOptions:{
            headerShown: false
        }},
    AlertsDetail: {
        screen: PostDetail,
        navigationOptions:{
            headerShown: false
        }},
    NewAlert: {
        screen: NewPost,
        navigationOptions:{
            headerShown: false
        }}
})

export const CheckInStack = createStackNavigator({
    CheckIn:  {
        screen: CheckIn,
        navigationOptions:{
            headerShown: false
        }},
    NewCheckIn: {
        screen: NewCheckIn,
        navigationOptions:{
            headerShown: false
        }}
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
        screen: PostStack,
        navigationOptions: {
            title: 'Avisos',
            drawerIcon: ({ tintColor }) => 
            <Icon name='notifications' size={25} color={tintColor}/>
        }
    },
    Dwellers: {
        screen: DwellerStack,
        navigationOptions: {
            title: 'Moradores',
            drawerIcon: ({ tintColor }) => 
            <Icon name='person' size={25} color={tintColor}/>
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
        screen: CheckInStack,
        navigationOptions: {
            title: 'Check-In',
            drawerIcon: ({ tintColor }) => 
            <Icon name='directions-walk' size={25} color={tintColor}/>
        }
    },
    // CheckOut: {
    //     screen: Visitors,
    //     navigationOptions: {
    //         title: 'Check-Out',
    //         drawerIcon: ({ tintColor }) => 
    //         <Icon name='directions-walk' size={25} color={tintColor}/>
    //     }
    // },
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


export const createRootNavigator = (signedIn = false, userType, firstLogin=false) => {
    let initialRouteName = '';
    console.log(`firstLogin: ${firstLogin} userType: ${userType}`);
    if (signedIn === false) initialRouteName = 'LoggedOut';
    else {
        if(firstLogin === true) initialRouteName = 'UpdatePassword';
        else initialRouteName = 'LoggedInAsUser';
    }
    
    const mainRoute = createSwitchNavigator({
        // LoggedInAsAdmin,
        // LoggedInAsRoot,
        LoggedInAsUser,
        LoggedOut: Login,
        UpdatePassword: UpdatePassword
    },
    {
        initialRouteName
    });

    return createAppContainer(mainRoute);
}