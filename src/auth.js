import AsyncStorage from '@react-native-community/async-storage';

import api from './services/api';

export const USER_TOKEN = 'USER_TOKEN';
/**
 * USER_TYPE: user, admin, root
 */
export const USER = 'USER';
export const CPF = 'CPF';
export const USER_COND = 'USER_COND';

export const logIn = async (email, password) => {
    try {
        const response = await api.post('/authenticate', { email, password });

        await AsyncStorage.setItem(USER_TOKEN, response.data.token);

        return true;
    }
    catch(err) {
        throw err;
    }
}

/** Grava no Async Storage as informações do condominio do usuário */
export const setCond = async (cond) => {
    await AsyncStorage.setItem(USER_COND, JSON.stringify(cond));
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
