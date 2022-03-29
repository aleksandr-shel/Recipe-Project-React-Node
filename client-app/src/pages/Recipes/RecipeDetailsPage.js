import React from "react";
import { useParams } from "react-router";
import {ListGroup, Breadcrumb, Col, Container, Row, Figure, Button} from 'react-bootstrap';
import axios from 'axios';
import {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../Auth/useUser";
import RecipeEditForm from "../../components/RecipeEditForm";

export default function RecipeDetails(){
    const {recipeId} = useParams();
    const [recipe, setRecipe] = useState()
    const user = useUser();

    const [editMode, setEditMode] = useState(false);

    function handleEditButton(){
        setEditMode(true);
    }

    useEffect(()=>{
        loadRecipe()
    },[])

    function loadRecipe(){
        axios.get(`/api/recipes/${recipeId}`)
        .then(response=>{
            setRecipe(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    return (
        <Container style={{marginBottom:'10%'}}>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/">Recipes List</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>Recipe Details Page</Breadcrumb.Item>
            </Breadcrumb>
            {
                !editMode
                &&
                <Row>
                    <Col md={9}>
                        {
                            recipe &&
                            <Figure>
                                <Figure.Caption>
                                    <h1>{recipe.recipeName}</h1>    
                                </Figure.Caption>
                                <Row>
                                    <Col md={8}>
                                        <Figure.Image
                                            width={300}
                                            src={recipe.imageUrl}/>
                                        <Figure.Caption>
                                            <h3>Description</h3>
                                            {recipe.description}
                                        </Figure.Caption>
                                        <Figure.Caption>
                                            <h3>Instruction</h3>
                                            {recipe.instruction}
                                        </Figure.Caption>
                                    </Col>
                                    <Col md={4}>
                                        {
                                            user?.id === recipe.author.id &&
                                            <div>
                                                <Button variant="outline-primary" onClick={handleEditButton}>Edit</Button>{' '}
                                                <Button variant="outline-danger">Delete</Button>
                                            </div>
                                        }
                                        <Figure.Caption>
                                            <h3>Time to Cook</h3>
                                            {recipe.timeToCook}
                                        </Figure.Caption>
                                        <Figure.Caption>
                                            <h3>Ingredients</h3>
                                            <ListGroup as="ul">
                                                {recipe.ingredients.map(ingr=>{
                                                    return <ListGroup.Item as="li">{ingr}</ListGroup.Item>
                                                })}
                                            </ListGroup>
                                        </Figure.Caption>
                                    </Col>
                                </Row>
                            </Figure>
                        }
                    </Col>
                
                    <Col md={3}>
                        Comments
                    </Col>
                </Row>
            }
            {
                recipe && editMode &&
                <RecipeEditForm setEditMode={setEditMode} recipe={recipe}/>
            }
        </Container>
    )
}