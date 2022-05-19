import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
    recipes: [],
    selectedRecipe: null
}

export const recipesSlice = createSlice({
    name:'recipes',
    initialState,
    reducers:{
        setRecipes: (state, {payload})=>{
            state.recipes = [...state.recipes, ...payload]
        }
    }
})
//actions

//fetch all recipes
export function fetchRecipes(pageNumber=1,recipesAmount = 20){
    return async (dispatch)=>{
        axios.get(`api/recipes?pageNumber=${pageNumber}&recipesAmount=${recipesAmount}`).then(response=>{
            dispatch(setRecipes(response.data))
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

export const {setRecipes} = recipesSlice.actions;

export const recipesSelector = (state) => state.recipes

export default recipesSlice.reducer;