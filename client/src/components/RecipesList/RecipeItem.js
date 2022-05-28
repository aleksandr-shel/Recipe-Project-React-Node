import React from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { selectRecipe } from "../../slice/recipesReducer";

export function RecipeItem(recipe, index, navigate){

    const dispatch = useDispatch();


    function moveToRecipeDetails(){
        window.scrollTo(0, 0);
        dispatch(selectRecipe(recipe))
        navigate(`/recipes/${recipe._id}`)
    }

    return(
        <Card key={index} style={{flex:'0 1 16rem', margin:"10px"}}>
            <Card.Img as='img' variant="top" src={recipe.imageUrl} style={{height:'100%', width:'100%'}} />
            <Card.Body>
                <Card.Title>{recipe.recipeName}</Card.Title>
                <Card.Text style={{height:'7rem', overflow:'auto'}}>
                    {recipe.description}
                </Card.Text>
                <Button variant="primary" onClick={()=>moveToRecipeDetails()}>More details</Button>
            </Card.Body>
        </Card>
    )
}