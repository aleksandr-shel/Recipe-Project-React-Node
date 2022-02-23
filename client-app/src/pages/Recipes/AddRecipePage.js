import React from "react"
import { RecipePostForm } from "../../components";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function AddRecipePage(){
    return(
        <>
            <GoBackButton>
                <Link to="/">Recipe List</Link>
            </GoBackButton>
            <RecipePostForm/>
        </>
    )
}


const GoBackButton = styled.div`
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


