
import React, {useEffect} from 'react';
import {Link, Outlet} from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Row, Col, ListGroup } from 'react-bootstrap';
import {AiOutlineUser} from 'react-icons/ai';
import styled from 'styled-components';
import RecipesLogo from './Recipes.png'
import { RecipeSearchList } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { usersSelector, setTokenAndUser, removeTokenAndUser, loadCurrentUser, setToken } from './../../slice/usersReducer';
import {GiHamburgerMenu, GiCook} from 'react-icons/gi'
import { useState } from 'react';
import {GrFavorite} from 'react-icons/gr';
import {AiOutlineInfoCircle} from 'react-icons/ai';

export default function Layout(){

    const dispatch = useDispatch();
    const {user} = useSelector(usersSelector);

    const [isExpanded, setExpanded] = useState(false);

    function logOut(){
        dispatch(removeTokenAndUser())
    }

    useEffect(()=>{
        const token = window.localStorage.getItem('token');
        if (token){
            dispatch(setToken(token))
            dispatch(loadCurrentUser())
        }
    },[dispatch])

    function toggleSideBarMenu(){
        setExpanded(!isExpanded);
    }

    return (
        <LayoutDiv>
            <div className='allnavbar'>
                <Navbar bg="light" expand='lg'>
                    <Container fluid>
                        {user &&
                            <Navbar.Brand>
                                <GiHamburgerMenu className='hamburger' onClick={toggleSideBarMenu} size={25}/>
                            </Navbar.Brand>
                        }
                        <Navbar.Brand as={Link} to='/'>
                            <img 
                                src={RecipesLogo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="Recipes logo"
                            />
                            ALL RECIPES
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav 
                                className="me-auto my-2 my-lg-0"
                            >
                                <RecipeSearchList/>
                            </Nav>
                            <NavDropdown style={{marginRight:'5%'}} title={<><AiOutlineUser/><span> </span>{user?.email}</>} id="navbarScrollingDropdown">
                                    {user != null ? 
                                        <>
                                            {/* <NavDropdown.Item as={Link} to='/account-info'>Account Info</NavDropdown.Item>
                                            <NavDropdown.Divider /> */}
                                            <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
                                        </>
                                        :
                                        <>
                                            <NavDropdown.Item><Link to="login">Login</Link></NavDropdown.Item>
                                            <NavDropdown.Item><Link to="register">Register</Link></NavDropdown.Item>
                                        </>
                                    }
                                </NavDropdown>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div style={{width: isExpanded ? '150px': '50px'}} className='sideBarMenu'>
                    {user && 
                        <ListGroup>
                            <ListGroup.Item as={Link} to='favorites'>
                                <GrFavorite/>
                                {isExpanded &&
                                ' Favorites'}
                            </ListGroup.Item>
                            {/* <ListGroup.Item as={Link} to='#'>
                                <GiCook/>
                                {isExpanded &&
                                ' My Recipes'}
                            </ListGroup.Item> */}
                            {/* <ListGroup.Item as={Link} to='#'>
                                <AiOutlineInfoCircle/>
                                {isExpanded &&
                                ' About'}
                            </ListGroup.Item> */}
                            
                        </ListGroup>
                    }
                </div>
            </div>
            <div>
                <Outlet/>
            </div>
        </LayoutDiv>
    )
}


const LayoutDiv = styled.div`
    a{
        text-decoration: none;
        color:#000000;
    }
    .allnavbar {
        position: sticky;
        top: 0;
        z-index: 1000;
    }
    .sideBarMenu{
        float: left;
        height:100vh;
    }

    .sideBarMenu a:hover{
        color: white;
        background-color: #000000;
    }

`