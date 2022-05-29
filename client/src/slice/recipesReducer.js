import { createSlice } from "@reduxjs/toolkit";
import agent from "../Api/agent";

const initialState = {
    recipes: [],
    nextPageToLoad: 2,
    favorites: [],
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
            const updatedRecipe = payload;
            state.recipes = state.recipes.map((recipe)=>{
                console.log(recipe._id)
                return recipe._id === updatedRecipe._id ? updatedRecipe : recipe;
            })
            return state;
        },
        deleteRecipe: (state, {payload})=>{
            const id = payload;
            state.recipes = state.recipes.filter(recipe=>{
                return recipe._id !== id;
            })
            return state;
        },
        selectRecipe: (state, {payload})=>{
            state.selectedRecipe = payload
            return state;
        },
        setFavorites: (state, {payload})=>{
            state.favorites = payload
            return state;
        },
        addFavorite: (state, {payload})=>{
            state.favorites.push(payload);
        },
        removeFavorite: (state, {payload})=>{
            const id = payload;
            state.favorites = state.favorites.filter(recipe=>{
                return recipe._id !== id;
            })
            return state;
        }
    }
})
//actions

//fetch all recipes
export function fetchRecipes(pageNumber=1,recipesAmount = 10){
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

export function updateRecipeApi(id, recipe){
    return async (dispatch)=>{
        agent.Recipes.update(id, recipe).then(recipe=>{
            dispatch(updateRecipe(recipe))
            dispatch(selectRecipe(recipe))
        }).catch(error=>{
            console.log(error);
        })
    }
}

export function deleteRecipeApi(id){
    return async (dispatch)=>{
        agent.Recipes.delete(id).then((res)=>{
            dispatch(deleteRecipe(id))
            dispatch(selectRecipe(null))
        }).catch(error=>{
            console.log(error);
        })
    }
}

export function loadRecipe(id){
    return async(dispatch)=>{
        agent.Recipes.details(id).then(recipe=>{
            dispatch(selectRecipe(recipe));
        }).catch(error=>{
            console.log(error);
        })
    }
}

export function fetchFavorites(ids){
    return async (dispatch)=>{
        agent.Recipes.favorites(ids).then(recipes=>{
            dispatch(setFavorites(recipes))
        }).catch(error=>{
            console.log(error);
        })
    }
}

export function addFavouriteApi(id, recipe){
    return async (dispatch)=>{
        agent.Recipes.addFavorite(id).then(response=>{
            dispatch(addFavorite(recipe))
        }).catch(error=>{
            console.log(error);
        })
    }
}

export function removeFavouriteApi(id){
    return async (dispatch)=>{
        agent.Recipes.removeFavorite(id).then(response=>{
            dispatch(removeFavorite(id))
        }).catch(error=>{
            console.log(error);
        })
    }
}

export const {setRecipes, addRecipe, fetchRecipesAnother, addNextPageToLoad, updateRecipe, deleteRecipe, selectRecipe, setFavorites, addFavorite, removeFavorite} = recipesSlice.actions;

export const recipesSelector = (state) => state.recipes

export default recipesSlice.reducer;