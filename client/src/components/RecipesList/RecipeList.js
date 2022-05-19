import React from "react";
import { useState, useEffect } from "react";
import styled from 'styled-components';
import { RecipeItem } from "./RecipeItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipes } from "./../../slice/recipesSlice";
import { recipesSelector } from './../../slice/recipesSlice';
import { Button } from "react-bootstrap";

export default function RecipeList(){
    const navigate = useNavigate();
    const [pageToDownload, setPageToDownload] = useState(2);
    const {recipes} = useSelector(recipesSelector)
    const dispatch = useDispatch();
    useEffect(()=>{
        if (recipes.length === 0){
            dispatch(fetchRecipes());
        }
    },[dispatch]);

    function handleClickMoreButton(){
        setPageToDownload(pageToDownload=>pageToDownload+1)
        dispatch(fetchRecipes(pageToDownload, 20))
    }


    return(
        <>
            <RecipeListDiv>
                {recipes?.map((recipe, index) => RecipeItem(recipe, index, navigate))}
            </RecipeListDiv>
            <Button onClick={handleClickMoreButton} variant='light' className='mx-auto w-100'>More</Button>
        </>
    )
}

const RecipeListDiv = styled.div`
    display:flex;
    flex-wrap: wrap;
    /* animation: appearsFromLeft 1s ease; */
    @keyframes appearsFromLeft {
        from{transform: translate(-50vw,0);}
        to{transform: translate(0);}
    }

`;