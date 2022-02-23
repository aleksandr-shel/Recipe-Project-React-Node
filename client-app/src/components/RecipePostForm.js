import React from "react";
import axios from 'axios'
import styled from 'styled-components';
import {useState, useEffect} from 'react';
import { useUser } from './../Auth/useUser';
import { useToken } from './../Auth/useToken';
import { useNavigate } from "react-router";

export function RecipePostForm(){

    const user = useUser()
    const [token, ] = useToken()
    const [recipeName, setRecipeName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [timeToCook, setTimeToCook] = useState('')
    const [instruction, setInstruction] = useState('')
    const [author, setAuthor] = useState({})
    const [ingredients, setIngredients] = useState([])
    const navigate = useNavigate();

    const [textareaDescSettings, setTextareaDescSettings] = useState({rows: 6})
    const [textareaInstructionSettings, setTextareaInstructionSettings] = useState({rows: 6})

    useEffect(()=>{
        setAuthor(user)
    }, [])



    function submitNewRecipe(){
        try{
            // console.log({
            //         recipeName,
            //         imageUrl,
            //         description,
            //         timeToCook,
            //         ingredients,
            //         author
            //     })
            const result = axios.post('/api/recipes/add',{
                recipeName,
                imageUrl,
                description,
                timeToCook,
                instruction,
                ingredients,
                author: user
            },{
                headers: {Authorization: `Bearer ${token}`}
            })

            console.log(result.data)
        }catch(err){
            console.log(err)
        }
    }

    function Cancel(){
        setRecipeName('');
        setDescription('');
        setImageUrl('');
        setTimeToCook('');
        navigate('/')
    }

    function handleDescriptionChange(e){
        setDescription(e.target.value)
        let addRow = parseInt((e.target.value.length * 0.5) / (e.target.rows * e.target.cols))
        setTextareaDescSettings({...textareaDescSettings, rows: textareaDescSettings.rows + addRow})
    }

    function handleInstructionChange(e){
        setInstruction(e.target.value)
        let addRow = parseInt((e.target.value.length * 0.5) / (e.target.rows * e.target.cols))
        setTextareaInstructionSettings({...textareaInstructionSettings, rows: textareaInstructionSettings.rows + addRow})
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
        <ul className="flex-inner">
            {ingredients.map((ingr, index)=>
                {
                    return (<li key={index}>
                        <input placeholder="Ingredient" value={ingr} onChange={(e)=>{handleIngredientsChange(e.target.value, index)}} />
                        <button style={{color:'white', background:'red'}} onClick={()=>deleteIngredientInput(index)}>X</button>
                    </li>)
                })
            }
            <button style={{color:'white', background:'#3cab54'}} onClick={addIngredientInput}>Add Ingredient</button>
        </ul>;
    return(
        <RecipeAddFormContainer>
            <ul className="flex-outer">
                <li>
                    <label htmlFor="recipename">Recipe Name: </label>
                    <input placeholder="Recipe Name" id="recipename" type="text" value={recipeName} onChange={(e)=>setRecipeName(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="desc">Description: </label>
                    <textarea rows={textareaDescSettings.rows} style={{resize:'vertical'}} placeholder="Description" id="desc" type="text" value={description} onChange={handleDescriptionChange}/>
                </li>
                <li>
                    <label htmlFor="instruction">Instruction: </label>
                    <textarea rows={textareaInstructionSettings.rows} style={{resize:'vertical'}} placeholder="Instruction" id="instruction" type="text" value={instruction} onChange={handleInstructionChange}/>
                </li>
                <li>
                    <label htmlFor="timetocook">Time To Cook: </label>
                    <input placeholder="1 hour" type="text" id="timetocook" value={timeToCook} onChange={(e)=>setTimeToCook(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="image">Image Url: </label>
                    <input type="text" id="image" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)}/>
                </li>
                <li>
                    <label>Ingredients: </label>
                    {IngredientsInputs}
                </li>
                <li>
                    <button onClick={submitNewRecipe}>
                        Share My Recipe
                    </button>
                </li>
                <li>
                    <button onClick={Cancel}>
                        Cancel
                    </button>
                </li>
            </ul>
        </RecipeAddFormContainer>
    )
}

const RecipeAddFormContainer = styled.div`
    animation: appearsFromRight 1s ease;
    width: 40%;
    max-width: 1200px;
    margin: 0 auto;

    .flex-outer{
        list-style-type:none;
        padding:0;
    }

    .flex-outer li {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .flex-outer > li:not(:last-child) {
        margin-bottom: 20px;
    }

    .flex-outer li label {
        padding: 8px;
        font-weight: 300;
    }

    .flex-outer > li > label {
        flex: 1 0 120px;
        max-width: 240px;
    }

    .flex-outer > li > label + * {
        flex: 1 0 240px;
    }

    .flex-outer li input, .flex-outer li textarea{
        padding: 15px;
    }

    .flex-outer li textarea{
        max-height: 500px;
    }

    .flex-outer li button {
        cursor:pointer;
        margin-left: auto;
        margin-right: auto;
        padding: 8px 16px;
        border: none;
        background: #333;
        color: #f2f2f2;
        text-transform: uppercase;
        letter-spacing: .09em;
        border-radius: 2px;
    }

    .flex-inner li input {
        padding: 3px;
        margin: 4px 5px;
    }

    @keyframes appearsFromLeft {
        from{transform: translate(-50vw,0);}
        to{transform: translate(0);}
    }

    @keyframes appearsFromRight {
        from {transform: translate(50vw,0);}
        to {transform: translate(0);}
    }
`;