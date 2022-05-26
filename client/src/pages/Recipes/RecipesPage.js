import React from "react";
import { RecipeList } from "../../components";
import { Link } from "react-router-dom";
import { useLoggedInContext } from "../../Context/LoggedInContext";
import {Button} from 'react-bootstrap';
import { useSelector } from "react-redux";
import { usersSelector } from "../../slice/usersReducer";

export default function RecipesPage(){

    const {user} = useSelector(usersSelector);

    return (
        <>
            {
                user != null && 
                <Button as={Link} to='add-recipe-page' variant='outline-dark' className='m-2'>
                    Share Recipe
                </Button>
            }
            <RecipeList/>
        </>
    )
}