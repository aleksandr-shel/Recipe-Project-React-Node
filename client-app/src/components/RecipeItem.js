import React from "react";
import { Card, Button } from "react-bootstrap";
export function RecipeItem(recipe, index, navigate){


    function selectRecipe(id){
        navigate(`/recipes/${id}`)
    }

    return(
        <Card key={index} style={{ width: '18rem', flex:'0 1 18rem', margin:"10px"}}>
            <Card.Img variant="top" src={recipe.imageUrl} style={{height:'16rem'}} />
            <Card.Body>
                <Card.Title>{recipe.recipeName}</Card.Title>
                <Card.Text style={{height:'10rem', overflow:'auto'}}>
                    {recipe.description}
                </Card.Text>
                <Button variant="primary" onClick={()=>selectRecipe(recipe._id)}>More info</Button>
            </Card.Body>
        </Card>
    )
}