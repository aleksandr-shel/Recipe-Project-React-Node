import React from "react";
import { useParams } from "react-router";


export default function RecipePage(){
    const {recipeId} = useParams();

    return (
        <>
        {recipeId}
        Recipe Page
        </>
    )
}