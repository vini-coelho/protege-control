import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode'

import api from './services/api';
import { JwtParse } from './utils/JwtParse';

export const USER_TOKEN = 'USER_TOKEN';
/**
 * USER_TYPE: user, admin, root
 */
export const USER = 'USER';
export const CPF = 'CPF';
export const USER_COND = 'USER_COND';

export const logIn = async (email, password) => {
    try {
        const response = await api.post('/authenticate', { email, password })
        console.log(`status: ${response.status}`);
        if(response.status == 200)
            await AsyncStorage.setItem(USER_TOKEN, response.data.token);

        return response;
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}

/** Grava no Async Storage as informações do condominio do usuário */
export const setCond = async (cond) => {
    await AsyncStorage.setItem(USER_COND, JSON.stringify(cond));
}
export const getCond = async () => {
    const cond = await AsyncStorage.getItem(USER_COND);
    console.log(cond);
    return JSON.parse(cond)
}
export const getDecriptedToken = async () => {
    const token = await AsyncStorage.getItem(USER_TOKEN)
    if(token) {
        const  userInfo = jwtDecode(token)
        console.log(token);
        return userInfo
    }

    return null
}

/** Grava no Async Storage as informações do usuário */
export const setUser = async (user) => {
    await AsyncStorage.setItem(USER, JSON.stringify(user));
}

/** Retorna o objeto Usuário */
export const getUser = async () => {
    const user = await AsyncStorage.getItem(USER);

    return JSON.parse(user);
}

export const onSignOut = async (navigation) => {
    await AsyncStorage.removeItem(USER_TOKEN);
    await AsyncStorage.removeItem(USER);
    await AsyncStorage.removeItem(USER_COND);

    navigation.navigate('LoggedOut');
}

export const isLoggedIn = async() => {
    res = await AsyncStorage.getItem(USER_TOKEN);

    return res !== null;
}
