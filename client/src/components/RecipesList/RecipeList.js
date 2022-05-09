
import { useState, useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { RecipeItem } from "./RecipeItem";
import { useNavigate } from "react-router-dom";

export default function RecipeList(){
    const [recipes, setRecipes] = useState([]);

    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('/api/recipes').then(result=>{
            setRecipes(result.data);
        }).catch(err=>{
            console.log(err);
        })
    },[])


    return(
        <>
            <RecipeListDiv>
                {recipes?.map((recipe, index) => RecipeItem(recipe, index, navigate))}
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