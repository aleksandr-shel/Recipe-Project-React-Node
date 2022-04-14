import React from "react";
import { useNavigate, useParams } from "react-router";
import {ListGroup, Breadcrumb, Col, Container, Row, Figure, Button, Form, CloseButton, Popover, OverlayTrigger} from 'react-bootstrap';
import axios from 'axios';
import {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../Auth/useUser";
import { RecipeDeleteForm, RecipeEditForm } from "../../components";
import { useToken } from "../../Auth/useToken";
import { useSocketContext } from "../../Context/socketContext";


export default function RecipeDetails(){
    const {recipeId} = useParams();
    const [recipe, setRecipe] = useState()
    const user = useUser();
    const [token,] = useToken();
    const navigate = useNavigate();

    const [editMode, setEditMode] = useState(false);
    const [showDeleteWindow, setShowDeleteWindow] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const [commentIdToDelete, setCommentIdToDelete] = useState('');

    const {socket} = useSocketContext();

    function handleEditButton(){
        setEditMode(true);
    }

    function handleDeleteButton(){
        setShowDeleteWindow(true);
    }

    useEffect(()=>{
        loadRecipe()
        socket.emit('join-recipe-page', {recipeId})
    },[])

    useEffect(()=>{
        socket.on('comment-added',(comment)=>{
            setComments(comments => [comment, ...comments])
        })

        socket.on('comment-deleted', ({commentId})=>{
            setComments(comments=> comments.filter(comment => comment._id !== commentId));
        })
    },[socket])

    function loadRecipe(){
        axios.get(`/api/recipes/${recipeId}`)
        .then(response=>{
            setRecipe(response.data);
            setComments(response.data.comments.reverse());
        }).catch(error=>{
            console.log(error);
        })
    }

    function addComment(e){
        e.preventDefault()
        if (!user){
            navigate('/login')
        }
        axios.post(`/api/recipes/${recipeId}/comments`,{
            author: user,
            date: new Date(Date.now()).toLocaleString(),
            comment
        }).then(response=>{
            setComment('');
            setComments(comments => [response.data, ...comments])
            socket.emit('addComment', {comment:response.data, recipeId})
        }).catch(error=>{
            console.log(error);
        })
    }

    function deleteComment(){
        if (recipeId && commentIdToDelete !== ''){
            console.log(recipeId)
            console.log(commentIdToDelete)
            axios.delete(`/api/recipes/${recipeId}/comments`,
            {
                headers: {Authorization: `Bearer ${token}`},
                data: {
                    commentId:commentIdToDelete
                }
            }).then(response=>{
                if(response.status===200){
                    setComments(comments=> comments.filter(comment => comment._id !== commentIdToDelete));
                    socket.emit('deleteComment', {commentId:commentIdToDelete, recipeId})
                    setCommentIdToDelete('');
                    document.body.click()
                }
            }).catch(error=>{
                console.log(error);
            })
        }
    }

    const CommentDeletePop = (
        <Popover id="popover-positioned-top">
          <Popover.Header as="h3">Delete Comment?</Popover.Header>
          <Popover.Body>
              <Button onClick={deleteComment}>
                  Confirm
              </Button>
              <Button variant="secondary" onClick={() => document.body.click()}>
                  Cancel
              </Button>
          </Popover.Body>
        </Popover>
      );

    return (
        <Container style={{marginBottom:'10%'}}>
            <Breadcrumb>
                <Breadcrumb.Item onClick={()=>{socket.emit('leave-recipe-page', {recipeId})}} linkAs={Link} linkProps={{to:'/'}}>Recipes List</Breadcrumb.Item>
                <Breadcrumb.Item active>Recipe Details Page</Breadcrumb.Item>
            </Breadcrumb>
            {
                !editMode
                &&
                <Row>
                    <Col md={9}>
                        {
                            recipe &&
                            <Figure>
                                <Figure.Caption>
                                    <h1>{recipe.recipeName}</h1>    
                                </Figure.Caption>
                                <Row>
                                    <Col md={8}>
                                        <Figure.Image
                                            width={300}
                                            src={recipe.imageUrl}/>
                                        <Figure.Caption>
                                            <h3>Description</h3>
                                            {recipe.description}
                                        </Figure.Caption>
                                        <Figure.Caption>
                                            <h3>Instruction</h3>
                                            {recipe.instruction}
                                        </Figure.Caption>
                                    </Col>
                                    <Col md={4}>
                                        {
                                            user?.id === recipe.author.id &&
                                            <div>
                                                <Button variant="outline-primary" onClick={handleEditButton}>Edit</Button>{' '}
                                                <Button variant="outline-danger" onClick={handleDeleteButton}>Delete</Button>
                                            </div>
                                        }
                                        <Figure.Caption>
                                            <h3>Time to Cook</h3>
                                            {recipe.timeToCook}
                                        </Figure.Caption>
                                        <Figure.Caption>
                                            <h3>Ingredients</h3>
                                            <ListGroup as="ul">
                                                {recipe.ingredients.map((ingr,index)=>{
                                                    return <ListGroup.Item key={index} as="li">{ingr}</ListGroup.Item>
                                                })}
                                            </ListGroup>
                                        </Figure.Caption>
                                    </Col>
                                </Row>
                            </Figure>
                        }
                    </Col>
                
                    <Col md={3}>
                        <h3>Comments</h3>
                        <Form onSubmit={e=>addComment(e)}>
                            
                            <Form.Group style={{padding:'6px'}}>
                                <Form.Control placeholder='Leave a comment' required value={comment} onChange={e=>setComment(e.target.value)}/>
                                <Button style={{margin:'5px'}} type='submit'>Comment</Button>
                            </Form.Group>
                        </Form>
                        <ListGroup style={{overflow:'auto', height:'60em'}}>
                        {comments.map((comment,index)=>{
                                {
                                    return <ListGroup.Item key={index} style={{position:'relative'}}>
                                        {
                                            user?.id === comment.author?.id &&
                                            <div style={{position:'absolute', top:'2px', right:'2px'}}>
                                                <OverlayTrigger rootClose trigger="click" placement="top" overlay={CommentDeletePop}>
                                                    <CloseButton onClick={()=>setCommentIdToDelete(comment._id)} />
                                                </OverlayTrigger>
                                            </div>
                                        }
                                        <p style={{color:'#2a5885', fontWeight:'bold'}}>
                                         {comment.author?.firstName} {comment.author?.lastName} 
                                        </p>
                                        <p style={{fontWeight:'500', fontSize:'1.1em'}}>
                                            {comment.comment}
                                        </p>
                                        <p style={{fontSize:'0.8em'}}>
                                            {new Date(comment.date).toLocaleTimeString()} {new Date(comment.date).toLocaleDateString()}
                                        </p>
                                    </ListGroup.Item>
                                }
                        })}
                        </ListGroup>
                    </Col>
                </Row>
            }
            {
                recipe && editMode &&
                <RecipeEditForm setEditMode={setEditMode} recipe={recipe} setRecipe={setRecipe} token={token}/>
            }
            {
                recipe &&
                <RecipeDeleteForm toShow={showDeleteWindow} setToShow={setShowDeleteWindow} recipeId={recipeId} token={token} />
            }
            
        </Container>
    )
}