import React from "react";
import { Button, Form, Col, Row } from 'react-bootstrap';
import { useState, useEffect } from "react";
import IngredientsList from './IngredientList';
import axios from "axios";
import InstructionList from "./InstructionList";

export default function RecipeEditForm({recipe, setEditMode, token, setRecipe}){

    const [recipeName, setRecipeName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [timeToCook, setTimeToCook] = useState('')
    const [instruction, setInstruction] = useState([])
    const [author, setAuthor] = useState({})
    const [ingredients, setIngredients] = useState([])
    const [cuisine, setCuisine] = useState([])
    const [category, setCategory] = useState([])

    useEffect(()=>{
        setRecipeName(recipe.recipeName)
        setImageUrl(recipe.imageUrl)
        setDescription(recipe.description)
        setInstruction(recipe.instruction)
        setTimeToCook(recipe.timeToCook)
        setAuthor(recipe.author)
        setIngredients(recipe.ingredients)
        setCategory(recipe.category);
        setCuisine(recipe.cuisine);
    },[])

    function handleSubmitEditForm(e){
        e.preventDefault();
        axios.put(`/api/recipes/${recipe._id}`,{
            recipeName,
            imageUrl,
            description,
            timeToCook,
            instruction,
            ingredients,
            author,
            cuisine,
            category
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setRecipe(response.data)
            setEditMode(false);
        })
    }

    function closeEditMode(){
        setEditMode(false);
    }

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
                                Instructions:
                            </Form.Label>
                            <InstructionList instruction={instruction} setInstruction={setInstruction}/>
                            {/* <Form.Control rows={10} as='textarea' onChange={(e)=>setInstruction(e.target.value)} value={instruction} placeholder='Instruction'/> */}
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{marginTop:'10px'}}>
                            Edit
                        </Button>
                        <Button variant="secondary" onClick={closeEditMode} style={{marginTop:'10px', marginLeft:'10px'}}>
                            Cancel
                        </Button>
                    </Col>
                    <Col sm={5}>
                        <Form.Group>
                            <Form.Label as='h3'>
                                Time to Cook:
                            </Form.Label>
                            <Form.Control type='text' value={timeToCook} onChange={(e)=>setTimeToCook(e.target.value)} placeholder='Time to Cook'/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label as='h3'>
                                Cuisine:
                            </Form.Label>
                            <Form.Control type='text' value={cuisine} onChange={(e)=>setCuisine(e.target.value)} placeholder='Cuisine'/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label as='h3'>
                                Category:
                            </Form.Label>
                            <Form.Control type='text' value={category} onChange={(e)=>setCategory(e.target.value)} placeholder='Category'/>
                        </Form.Group>
                        <Form.Group style={{height:'70rem', overflow:'auto'}}>
                            <Form.Label as='h3'>
                                Ingredients:
                            </Form.Label>
                            <IngredientsList ingredients={ingredients} setIngredients={setIngredients}/>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </>
    )
}