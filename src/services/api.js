import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

// var url = 'https://protege-control-backend.herokuapp.com' //test
// const url = 'http://127.0.0.1:3333'// local
const url = 'https://protege-back.startecapp.com.br/' //release
const api = axios.create({
    baseURL: url
});

api.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem('USER_TOKEN');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;

    } catch (err) {
        throw err;
    }
})

export default api;