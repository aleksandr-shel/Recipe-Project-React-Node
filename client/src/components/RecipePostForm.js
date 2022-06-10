import React from "react";
import { Button, Form, Col, Row, Image } from 'react-bootstrap';
import { useState, useEffect } from "react";
import IngredientsListForm from './RecipeDetails/IngredientListForm';
import InstructionListForm from "./RecipeDetails/InstructionListForm";
import { useNavigate } from "react-router-dom";
import cuisines from "./SelectOptions/cuisines";
import Select from 'react-select';
import categories from "./SelectOptions/categories";
import { useDispatch } from 'react-redux';
import { addRecipeApi } from "../slice/recipesReducer";
import { usersSelector } from './../slice/usersReducer';
import { useSelector } from "react-redux";

export default function RecipePostForm(){

    const {user} = useSelector(usersSelector)
    const [recipeName, setRecipeName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState([''])
    const [timeToCook, setTimeToCook] = useState('')
    const [instruction, setInstruction] = useState([])
    const [author, setAuthor] = useState({})
    const [ingredients, setIngredients] = useState([])
    const [cuisine, setCuisine] = useState('')
    const [category, setCategory] = useState([])
    const [categorySelect, setCategorySelect] = useState([])

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(()=>{
        setAuthor(user);
    },[user])

    function handleSubmitEditForm(e){
        e.preventDefault();

        try{
            dispatch(addRecipeApi({
                recipeName,
                imageUrl,
                description,
                timeToCook,
                instruction,
                ingredients,
                author,
                cuisine,
                category
            }))
            navigate('/')
        }catch (error){
            console.log(error);
        }
    }

    function closeButton(){
        navigate('/')
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
                            <Form.Control type='text' value={imageUrl} onChange={(e)=>{setImageUrl(e.target.value);}} placeholder='Insert Image URL or Upload Image'/>
                            {/* <Form.Control onChange={checkFileExtension} type='file'/>
                            <Button style={{display:'block'}} variant='secondary'>Upload Image</Button> */}
                            <div className='cropped-img'>
                                <Image alt='no image' src={imageUrl} className='img-fluid' style={{margin:'10px'}}/>
                            </div>
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
                            <Form.Control as='textarea' rows={10} placeholder="Description" value={description.join('\n')} onChange={(e)=>setDescription(e.target.value.split('\n'))} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label as='h3'>
                                Instructions:
                            </Form.Label>
                            <InstructionListForm instruction={instruction} setInstruction={setInstruction}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{marginTop:'10px'}}>
                            Share Recipe
                        </Button>
                        <Button variant="secondary" onClick={closeButton} style={{marginTop:'10px', marginLeft:'10px'}}>
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
                            <Form.Select value={cuisine} onChange={(e)=>setCuisine(e.target.value)} placeholder='Cuisine'>
                                {cuisines.map((cuisine,index)=>{
                                    return (
                                        <option key={index} value={cuisine}>{cuisine}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label as='h3'>
                                Category:
                            </Form.Label>
                            <Select 
                                value={categorySelect}
                                onChange={(selected)=>{
                                    setCategorySelect(selected);
                                    let categoryArray = []
                                    selected.forEach(cat =>{
                                        categoryArray.push(cat.value);
                                    })
                                    setCategory(categoryArray);
                                }}
                                isMulti
                                options={categories}
                            />
                        </Form.Group>
                        <Form.Group style={{height:'70rem', overflow:'auto'}}>
                            <Form.Label as='h3'>
                                Ingredients:
                            </Form.Label>
                            <IngredientsListForm ingredients={ingredients} setIngredients={setIngredients}/>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </>
    )
}