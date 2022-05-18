import React from "react";
import { Card, Button } from "react-bootstrap";
export function RecipeItem(recipe, index, navigate){


    function selectRecipe(id){
        window.scrollTo(0, 0)
        navigate(`/recipes/${id}`)
    }

    return(
        <Card key={index} style={{flex:'0 1 16rem', margin:"10px"}}>
            <Card.Img as='img' variant="top" src={recipe.imageUrl} style={{height:'100%', width:'100%'}} />
            <Card.Body>
                <Card.Title>{recipe.recipeName}</Card.Title>
                <Card.Text style={{height:'7rem', overflow:'auto'}}>
                    {recipe.description}
                </Card.Text>
                <Button variant="primary" onClick={()=>selectRecipe(recipe._id)}>More details</Button>
            </Card.Body>
        </Card>
    )
}