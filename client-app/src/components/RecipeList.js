
import { useState, useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { RecipeItem } from "./RecipeItem";


export function RecipeList(){
    const [recipes, setRecipes] = useState([]);

    useEffect(()=>{
        axios.get('/api/recipes').then(response=>{
            console.log(response);
        })
    },[])

    return(
        <RecipeListDiv>
            <h1 style={{textAlign:'center'}}>Recipes</h1>
            <table>
                {recipes.map((recipe, index) => RecipeItem(recipe, index))}
            </table>
        </RecipeListDiv>
    )
}

const RecipeListDiv = styled.div`
    animation: appearsFromLeft 1s ease;

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

`;