import React from "react";
import { Button, Form, Col, Row, Image } from 'react-bootstrap';
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser} from '../../Auth/useUser';
import { useToken } from "../../Auth/useToken";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addRecipeApi } from "../../slice/recipesReducer";
import {Formik} from 'formik';
import agent from "../../Api/agent";
import { useSelector } from 'react-redux';
import { usersSelector } from "../../slice/usersReducer";
import * as Yup from 'yup';

export default function RecipeForm(){

    const [token,] = useToken();
    const navigate = useNavigate();
    const [recipe,setRecipe] = useState();
    const {user} = useSelector(usersSelector);
    
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        
    })

    useEffect(()=>{
        setRecipe({...recipe, author: user})
        console.log(recipe);
    },[user])

    function handleChange(event){
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value})
    }

    function handleSubmit(){
        
    }

    function handleSubmitEditForm(e){
        e.preventDefault();
    }

    function closeButton(){
        navigate('/')
    } 

    return(
        <Formik
            initialValues={recipe}
        >
        </Formik>
    )
}