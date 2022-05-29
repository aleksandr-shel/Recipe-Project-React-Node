import {createSlice} from '@reduxjs/toolkit';
import agent from '../Api/agent';

const initialState = {
    user: null,
    token: null,
    loading: false
}

export const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers: {
        setToken: (state, {payload})=>{
            state.token = payload;
            window.localStorage.setItem('token', payload);
            return state;
        },
        removeToken: (state)=>{
            state.token = null;
            window.localStorage.removeItem('token');
            return state;
        },
        setUser: (state, {payload})=>{
            state.user = payload;
            return state;
        },
        setLoading:(state, {payload})=>{
            state.loading = payload;
            return state;
        }
    }
}) 


export function removeTokenAndUser(){
    return async (dispatch)=>{
        dispatch(removeToken());
        dispatch(setUser(null));
    }
}

export function loadCurrentUser(){
    return async (dispatch)=>{
        agent.User.getCurrent().then(user=>{
            dispatch(setUser(user));
        })
    }
}


export const {setUser, setToken, setLoading, removeToken} = usersSlice.actions;

export const usersSelector = (state)=> state.users

export default usersSlice.reducer;
