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
        <ListGroup as="ol" numbered>
            {
                instruction.map((instr, index)=>{
                    return (
                        <ListGroup.Item as='li' key={index}>
                            <Row>
                                {
                                    instr.img && 
                                    <Col sm={4}>
                                        <Image src={instr.img || ''} className='img-thumbnail m-2'/>
                                    </Col>
                                }
                                <Col>
                                    <Form.Control type='text' className='m-2' placeholder="Instruction Image URL" value={instr.img || ''} onChange={(e)=>{handleInstructionImgChange(e.target.value, index)}} />
                                    <Form.Control rows={5} as='textarea' className='m-2' placeholder="Instruction Description" value={instr.description} onChange={(e)=>{handleInstructionDescChange(e.target.value, index)}} />
                                </Col>
                                <Col sm={1}>
                                    <Button variant='danger' className='m-2' onClick={()=>deleteInstructionStepInput(index)}>X</Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })
            }
            <ListGroup.Item as='li'>
                <Button variant='outline-success' onClick={addInstructionStepInput}>Add Instruction Step</Button>
            </ListGroup.Item>
        </ListGroup>
    )
}