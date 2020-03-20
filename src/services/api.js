import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
    baseURL: 'https://protege-control-backend.herokuapp.com'
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