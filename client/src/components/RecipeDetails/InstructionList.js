import React from "react";
import { Button, Form, ListGroup, Col, Row, Image } from 'react-bootstrap';

export default function InstructionList({instruction, setInstruction}){

    function handleInstructionDescChange(value, index){

        setInstruction(instrs => {
            let newArr = [...instrs]
            newArr[index].description = value;
            return newArr;
        })
    }
    function handleInstructionImgChange(value, index){

        setInstruction(instrs => {
            let newArr = [...instrs]
            newArr[index].img = value;
            return newArr;
        })
    }

    function addInstructionStepInput(){
        setInstruction(instrs => [...instrs, {img:'',description:''}])
    }

    function deleteInstructionStepInput(index){
        setInstruction(instrs =>{
            let newArr = [...instrs];
            newArr.splice(index, 1);
            return newArr;
        })
    }

    return (
        <ListGroup>
            {
                instruction.map((instr, index)=>{
                    return (
                        <ListGroup.Item key={index}>
                            <Row>
                                {
                                    instr.img && 
                                    <Col sm={4}>
                                        <Image src={instr.img || ''} className='img-thumbnail'/>
                                    </Col>
                                }
                                <Col>
                                    <Form.Control type='text' placeholder="Instruction Image URL" value={instr.img || ''} onChange={(e)=>{handleInstructionImgChange(e.target.value, index)}} />
                                    <Form.Control as='textarea' placeholder="Instruction Description" value={instr.description} onChange={(e)=>{handleInstructionDescChange(e.target.value, index)}} />
                                </Col>
                                <Col sm={2}>
                                    <Button variant='danger' onClick={()=>deleteInstructionStepInput(index)}>X</Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })
            }
            <ListGroup.Item as='li'>
                <Button variant='success' onClick={addInstructionStepInput}>Add Instruction</Button>
            </ListGroup.Item>
        </ListGroup>
    )
}