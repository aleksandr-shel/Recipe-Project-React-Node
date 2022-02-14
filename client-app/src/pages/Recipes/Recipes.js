import React from "react";
import { useState, useEffect } from "react";
import './Recipes.css';

const baseUrl = 'http://localhost:5000/api/'

function RecipeItem(recipe, index){

    return(
        <tr key={index} className="recipe-item">
            <td>
                {recipe.recipeName}
            </td>
            <td className="recipe-desc">
                {recipe.description}
            </td>
            <td>
                {recipe.timeToCook}
            </td>
            <td>
                <img alt={recipe.recipeName} src={recipe.imageUrl}/>
            </td>
        </tr>
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
        <div className="recipe-list">
            <table>
                {recipes.map((recipe, index) => RecipeItem(recipe, index))}
            </table>
        </div>
    )
}

export default function Recipes(){


    return (
        <RecipeList/>
    )
}