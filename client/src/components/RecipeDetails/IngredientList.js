import React from "react";
import { Button, Form, ListGroup, Col, Row } from 'react-bootstrap';


export default function IngredientList({ingredients, setIngredients}){
    function handleIngredientsChange(value, index){

        setIngredients(ingrds => {
            let newArr = [...ingrds]
            newArr[index] = value;
            return newArr;
        })
        console.log(ingredients)
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
    return (
        <ListGroup as="ul" sm={4}>
            {ingredients.map((ingr, index)=>
                {
                    return (<ListGroup.Item as='li' key={index}>
                                <Row>
                                    <Col sm={10}>
                                        <Form.Control type='text' placeholder="Ingredient" value={ingr || ''} onChange={(e)=>{handleIngredientsChange(e.target.value, index)}} />
                                    </Col>
                                    <Col sm={2}>
                                        <Button variant='danger' onClick={()=>deleteIngredientInput(index)}>X</Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>)
                })
            }
            <ListGroup.Item as='li'>
                <Button variant='outline-success' onClick={addIngredientInput}>Add Ingredient</Button>
            </ListGroup.Item>
        </ListGroup>
    )
}