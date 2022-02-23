import React from "react";
import { RecipeList } from "../../components";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Recipes(){


    return (
        <>
            <GoButton>
                <Link to="add-recipe-page">Add Recipe</Link>
            </GoButton>
            <RecipeList/>
        </>
    )
}

const RecipesPage = styled.div`

`

const GoButton = styled.div`
    margin: 8px;
    a {
        text-decoration: none;
        cursor: pointer;
        margin: auto;
        padding: 4px;
        border: none;
        background: #333;
        color: #f2f2f2;
        letter-spacing: .09em;
        border-radius: 2px;
    }
`