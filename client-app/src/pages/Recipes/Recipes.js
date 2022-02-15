import React from "react";
import { useState, useEffect } from "react";
import styled from 'styled-components';

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
        <RecipeListDiv>
            <table>
                {recipes.map((recipe, index) => RecipeItem(recipe, index))}
            </table>
        </RecipeListDiv>
    )
}

export default function Recipes(){


    return (
        <RecipeList/>
    )
}


const RecipeListDiv = styled.div`
    .recipe-list{
        padding:0;
        width: 50%;
        margin:auto;
    }

    @media only screen and (max-width: 1200px){
        .recipe-list{
            width:100%;
            padding:0;
        }
    }

    .recipe-desc{
        overflow: hidden;
        height: 200px;
    }

    @keyframes hoverItem {
        from{background-color: white;}
        to{background-color: darkgrey;}
    }

    .recipe-item:hover{
        animation-name: hoverItem;
        animation-duration: 1s;
        animation-timing-function: ease;
        animation-fill-mode: forwards;
    }

    th,td :hover{
        /* does not work*/
        animation: hoverItem 1s ease forwards;
    }


    .recipe-item img{
        margin: 5px;
        width: 300px;
    }


    @keyframes appearsFromLeft {
        from{transform: translate(-50vw,0);}
        to{transform: translate(0);}
    }

    @keyframes appearsFromRight {
        from {transform: translate(50vw,0);}
        to {transform: translate(0);}
    }
`;