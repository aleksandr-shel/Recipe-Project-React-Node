import React from "react";
import { ListGroup, Form, Button, FormControl, Row, Image} from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { selectRecipe } from "../slice/recipesReducer";

export default function RecipeSearchList(){

    const [recipes, setRecipes] = useState([])
    const [query, setQuery] = useState('');
    const wrapperRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const result = await axios.post('/api/recipes/search',{
                query
            })
            console.log(result.data);
            setRecipes(result.data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setRecipes([])
            }
          }
        document.addEventListener("mousedown", handleClickOutside);
    },[wrapperRef])

    function handleRecipeClick(recipe){
        dispatch(selectRecipe(recipe))
        navigate(`/recipes/${recipe._id}`)
    }

    return(
        <Div ref={wrapperRef}>
            <Row>
                <Form className="d-flex" onSubmit={handleSubmit}>
                    <FormControl
                        type="search"
                        placeholder="Search for Recipe"
                        className="me-2"
                        aria-label="Search"
                        value={query}
                        onChange={(e)=>{setQuery(e.target.value); setRecipes([])}}
                    />
                    <Button variant="outline-success" type='submit'>Search</Button>
                </Form>
            </Row>
            <Row style={{position:'absolute'}}>
                {
                    recipes !== 0 &&
                    <ListGroup style={{zIndex:'1', position:'relative'}} className='ms-2'>
                        {recipes.map((recipe, index)=>{
                            return(
                                <ListGroup.Item key={index} className='d-flex' onClick={()=>{handleRecipeClick(recipe)}}>
                                    <Image src={recipe.imageUrl} alt='no image' style={{width:'50px'}} className='mx-2 my-auto img-thumbnail'/>
                                    <div className='mx-2 my-auto'>
                                        {recipe.recipeName}
                                    </div>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                }
            </Row>
        </Div>
    )
}

const Div = styled.div`
    .list-group-item:hover{
        background-color: #EAEAEA;
        cursor:pointer
    }
`