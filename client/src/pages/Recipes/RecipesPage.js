import React from "react";
import { RecipeList } from "../../components";
import { Link } from "react-router-dom";
import { useLoggedInContext } from "../../Context/LoggedInContext";
import {Button} from 'react-bootstrap';

export default function RecipesPage(){

    const loggedInContext = useLoggedInContext();


    return (
        <>
            {
                loggedInContext.loggedIn && 
                <Button as={Link} to='add-recipe-page' variant='outline-dark' className='m-2'>
                    Share Recipe
                </Button>
            }
            <RecipeList/>
        </>
    )
}