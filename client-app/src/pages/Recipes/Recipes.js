import React from "react";
import { useState, useEffect } from "react";
import './Recipes.css';

const baseUrl = 'http://localhost:5000/api/'

function RecipeItem(recipe, index){

    return(
        <li key={index} className="recipe-item">
            <div>
                <div>{recipe.recipeName}</div>
                <div>{recipe.description}</div>
            </div>
            <img alt="recipe img" src={recipe.imageUrl}/>
        </li>
    )
}



function RecipeList(){
    const [recipes, setRecipes] = useState([]);

    useEffect(()=>{
        fetch(baseUrl + 'recipes')
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                setRecipes(data);
            })
    },[])

    return(
        <div>
            <ul className="recipe-list">
                {recipes.map((recipe, index) => RecipeItem(recipe, index))}
            </ul>
        </div>
    )
}

export default function Recipes(){


    return (
        <RecipeList/>
    )
}