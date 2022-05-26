import React from "react";
import { Button, Form, Col, Row, Image} from 'react-bootstrap';
import { useState, useEffect } from "react";
import IngredientsListForm from './IngredientListForm';
import axios from "axios";
import InstructionListForm from "./InstructionListForm";
import cuisines from "../SelectOptions/cuisines";
import Select from 'react-select';
import categories from "../SelectOptions/categories";
import agent from "../../Api/agent";

export default function RecipeEditForm({recipe, setEditMode, token, setRecipe}){

    const [recipeName, setRecipeName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState([])
    const [timeToCook, setTimeToCook] = useState('')
    const [instruction, setInstruction] = useState([])
    const [author, setAuthor] = useState({})
    const [ingredients, setIngredients] = useState([])
    const [cuisine, setCuisine] = useState('')
    const [category, setCategory] = useState([])
    const [categorySelect, setCategorySelect] = useState([])

    useEffect(()=>{
        setRecipeName(recipe.recipeName)
        setImageUrl(recipe.imageUrl)
        setDescription(recipe.description)
        setInstruction(recipe.instruction)
        setTimeToCook(recipe.timeToCook)
        setAuthor(recipe.author)
        setIngredients(recipe.ingredients)
        let categoryArray = []
        recipe.category.forEach(cat =>{
            categoryArray.push({value:cat, label:cat});
        })
        setCategorySelect(categoryArray);
        setCuisine(recipe.cuisine);
    },[])

    function handleSubmitEditForm(e){
        e.preventDefault();

        agent.Recipes.update({id: recipe._id, recipe: {
            recipeName,
            imageUrl,
            description,
            timeToCook,
            instruction,
            ingredients,
            author,
            cuisine,
            category
        }})

        // axios.put(`/api/recipes/${recipe._id}`,{
        //     recipeName,
        //     imageUrl,
        //     description,
        //     timeToCook,
        //     instruction,
        //     ingredients,
        //     author,
        //     cuisine,
        //     category
        // },{
        //     headers:{
        //         Authorization: `Bearer ${token}`
        //     }
        // }).then(response=>{
        //     setRecipe(response.data)
        //     setEditMode(false);
        // })
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
                            <Image alt='no image' className='img-fluid' src={imageUrl} height={300} style={{margin:'10px'}}/>
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