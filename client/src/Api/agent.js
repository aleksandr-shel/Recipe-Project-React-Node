import axios from "axios";
// import {history} from '../index';
import store from './../store/index';
import { toast } from 'react-toastify';

axios.interceptors.request.use(config=>{
    const token = store.getState().users.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use( async response=>{
    return response;
}, (error)=>{
    const {status} = error.response;
    switch(status){
        case 400:
            toast.error('bad request')
        case 401:
            toast.error('unautorized');
            break;
        case 404:
            toast.error('not found')
            break;
        case 500:
            toast.error('server error')
            break;
    }
    return Promise.reject(error);
})


const responseBody = (response)=> response.data;

const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    delete: (url) => axios.delete(url).then(responseBody),
}


const Recipes = {
    list: (pageNumber=1,recipesAmount = 20)=> requests.get(`/api/recipes?pageNumber=${pageNumber}&recipesAmount=${recipesAmount}`),
    details: (id)=> requests.get(`/api/recipes/${id}`),
    create: (recipe)=> requests.post('/api/recipes', recipe),
    update: (id, recipe)=> requests.put(`/api/recipes/${id}`, recipe),
    delete: (id)=> requests.delete(`/api/recipes/${id}`),
}

const User = {
    login: (user)=> requests.post('/api/users/login', user),
    register: (user)=> requests.post('/api/users/register', user)
}



const agent = {
    Recipes,
    User
}

export default agent;