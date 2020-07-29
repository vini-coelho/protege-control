import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

// var url = 'https://protege-control-backend.herokuapp.com'
const url = 'http://127.0.0.1:3333'
// const url = 'http://142.11.215.48:4231'
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