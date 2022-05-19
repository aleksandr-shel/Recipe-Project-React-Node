import {configureStore} from '@reduxjs/toolkit';
import recipesReducer from '../slice/recipesSlice';

export default configureStore({
    reducer: {
        recipes: recipesReducer,
    },
})