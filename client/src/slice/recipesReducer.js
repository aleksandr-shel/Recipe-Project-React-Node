import { createSlice } from "@reduxjs/toolkit";
import agent from "../Api/agent";

const initialState = {
    recipes: [],
    nextPageToLoad: 2,
    selectedRecipe: null
}

export const recipesSlice = createSlice({
    name:'recipes',
    initialState,
    reducers:{
        setRecipes: (state, {payload})=>{
            state.recipes = [...state.recipes, ...payload];
            return state;
        },
        addRecipe: (state, {payload})=>{
            state.recipes.push(payload);
        },
        addNextPageToLoad: (state)=>{
            state.nextPageToLoad++;
            return state;
        },
        updateRecipe: (state, {payload})=>{
            
        },
        deleteRecipe: (state, {payload})=>{

        },
        selectRecipe: (state, {payload})=>{
            state.selectedRecipe = payload
            return state;
        }
    }
})
//actions

//fetch all recipes
export function fetchRecipes(pageNumber=1,recipesAmount = 4){
    return async (dispatch)=>{
        agent.Recipes.list(pageNumber, recipesAmount).then(recipes =>{
            dispatch(setRecipes(recipes))
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}


export function addRecipeApi(recipe){
    return async (dispatch)=>{
        agent.Recipes.create(recipe).then(recipe=>{
            dispatch(addRecipe(recipe));
        }).catch(error=>{
            console.log(error);
        })
    }
}

export const {setRecipes, addRecipe, fetchRecipesAnother, addNextPageToLoad} = recipesSlice.actions;

export const recipesSelector = (state) => state.recipes

export default recipesSlice.reducer;