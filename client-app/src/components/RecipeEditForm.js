import React from "react";
import { Button, Form, ListGroup, Col, Row } from 'react-bootstrap';
import { useState, useEffect } from "react";
import axios from "axios";

export default function RecipeEditForm({recipe, setEditMode}){

    const [recipeName, setRecipeName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [timeToCook, setTimeToCook] = useState('')
    const [instruction, setInstruction] = useState('')
    const [author, setAuthor] = useState({})
    const [ingredients, setIngredients] = useState([])

    useEffect(()=>{
        setRecipeName(recipe.recipeName)
        setImageUrl(recipe.imageUrl)
        setDescription(recipe.description)
        setInstruction(recipe.instruction)
        setTimeToCook(recipe.timeToCook)
        setAuthor(recipe.author)
        setIngredients(recipe.ingredients)
    },[])

    function handleSubmitEditForm(e){
        e.preventDefault();
    }

    function closeEditMode(){
        setEditMode(false);
    }

    function handleIngredientsChange(value, index){

        setIngredients(ingrds => {
            let newArr = [...ingrds]
            newArr[index] = value;
            return newArr;
        })
    }

    function addIngredientInput(){
        setIngredients(ingrds => [...ingrds, ''])
    }

    function deleteIngredientInput(index){
        setIngredients(ingrds =>{
            let newArr = [...ingrds];
            newArr.splice(index, 1);
            return newArr;
        })
    }
    const IngredientsInputs = 
    <ListGroup as="ul" sm={4}>
        {ingredients.map((ingr, index)=>
            {
                return (<ListGroup.Item as='li' key={index}>
                            <Row>
                                <Col sm={10}>
                                    <Form.Control type='text' placeholder="Ingredient" value={ingr} onChange={(e)=>{handleIngredientsChange(e.target.value, index)}} />
                                </Col>
                                <Col sm={2}>
                                    <Button variant='danger' onClick={()=>deleteIngredientInput(index)}>X</Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>)
            })
        }
        <ListGroup.Item as='li'>
            <Button variant='success' onClick={addIngredientInput}>Add Ingredient</Button>
        </ListGroup.Item>
    </ListGroup>;
    return(
        <>
            <Form onSubmit={handleSubmitEditForm}>
                <Row>
                    <Col sm={7}>
                        <Form.Group>
                            <Form.Label as='h3'>
                                Image URL:
                            </Form.Label>
                            <Form.Control type='url' value={imageUrl} type='text' onChange={(e)=>{setImageUrl(e.target.value);}} placeholder='Image URL'/>
                            <img alt='no image' src={imageUrl} height={300} style={{margin:'10px'}}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label as='h3'>
                                Recipe Name:
                            </Form.Label>
                            <Form.Control type='text' value={recipeName} onChange={(e)=>setRecipeName(e.target.value)} placeholder='Recipe Name'/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label as='h3'>
                                Description:
                            </Form.Label>
                            <Form.Control rows={10} as='textarea' onChange={(e)=>setDescription(e.target.value)} value={description} placeholder='Description'/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label as='h3'>
                                Instruction:
                            </Form.Label>
                            <Form.Control rows={10} as='textarea' onChange={(e)=>setInstruction(e.target.value)} value={instruction} placeholder='Instruction'/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label as='h3'>
                                Time to Cook:
                            </Form.Label>
                            <Form.Control type='text' value={timeToCook} onChange={(e)=>setTimeToCook(e.target.value)} placeholder='Time to Cook'/>
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{marginTop:'10px'}}>
                            Edit
                        </Button>
                        <Button variant="secondary" onClick={closeEditMode} style={{marginTop:'10px', marginLeft:'10px'}}>
                            Cancel
                        </Button>
                    </Col>
                    <Col sm={5}>
                        <Form.Group style={{height:'70rem', overflow:'auto'}}>
                            <Form.Label as='h3'>
                                Ingredients:
                            </Form.Label>
                            {IngredientsInputs}
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </>
    )
}