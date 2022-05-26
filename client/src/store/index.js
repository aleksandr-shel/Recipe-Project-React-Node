import {configureStore} from '@reduxjs/toolkit';
import recipesReducer from '../slice/recipesReducer';
import usersReducer from '../slice/usersReducer';

const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        users: usersReducer
    },
})

export default store;