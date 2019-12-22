import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.42.139:3000'
});


export default api;