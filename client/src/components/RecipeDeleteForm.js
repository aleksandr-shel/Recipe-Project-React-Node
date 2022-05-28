import React from 'react';
import {Button, Form} from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { deleteRecipeApi } from '../slice/recipesReducer';

export default function RecipeDeleteForm({toShow, setToShow, recipeId, token}){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleDelete(){
        // axios.delete(`/api/recipes/${recipeId}`,{
        //     headers: {Authorization: `Bearer ${token}`}
        // }).then( response =>{
        //     if (response.status === 200){
        //         navigate('/')
        //     }
        // })
        dispatch(deleteRecipeApi(recipeId));
        navigate('/');
    }

    function handleCancel(){
        setToShow(false);
    }

    return(
        <ModalWindow style={{display: toShow ? 'flex' : 'none'}} onClick={()=>setToShow(false)}>
            <div className='form-container' onClick={e => e.stopPropagation()}>
                <h3 style={{textAlign:'center'}}>Delete this recipe?</h3>
                <div className="buttons">
                    <Button variant='danger' onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button variant='secondary' onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>
            </div>
        </ModalWindow>
    )
}


const ModalWindow = styled.div`
    z-index:1;
    position: absolute;

    top:0;
    left:0;
    /* filter: alpha(opacity=60); */
    display: flex;
    min-height: 100vh;
    min-width: 100vw;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(3px);
    .form-container{
        padding: 10px;
        width:20%;
        height:20%;
        display: flex;
        flex-direction: column;
        background-color: #EAEAEA;
    }
    .buttons{
        display: flex;
        justify-content: space-between;
    }
`