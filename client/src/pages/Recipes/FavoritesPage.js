import React from "react";
import { useEffect } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from "../../slice/recipesReducer";
import { recipesSelector } from '../../slice/recipesReducer';
import { RecipeItem } from './../../components/RecipesList/RecipeItem';
import { usersSelector } from "../../slice/usersReducer";

export default function FavoritesList(){
    const navigate = useNavigate();
    const {favorites} = useSelector(recipesSelector)
    const dispatch = useDispatch();

    const {user} = useSelector(usersSelector);

    useEffect(()=>{
        if (user && favorites.length === 0){
            dispatch(fetchFavorites());
        }
    },[dispatch, favorites.length, user]);



    return(
        <>
            <h2>Favorites</h2>
            <RecipeListDiv>
                {favorites?.map((recipe, index) => RecipeItem(recipe, index, navigate))}
            </RecipeListDiv>
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