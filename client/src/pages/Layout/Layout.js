
import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import {useLoggedInContext } from '../../Context/LoggedInContext';
import { useUser } from '../../Auth/useUser';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import {AiOutlineUser} from 'react-icons/ai';
import styled from 'styled-components';
import RecipesLogo from './Recipes.png'
import { RecipeSearchList } from '../../components';

export default function Layout(){

    const user = useUser()
    const loggedInContext = useLoggedInContext()

    function logOut(){
        localStorage.removeItem('token')
        loggedInContext.setLoggedIn(false)
    }

    return (
        <LayoutDiv>
            <Navbar bg="light" expand="lg">
                <Container>
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
                        <NavDropdown style={{marginRight:'5%'}} title={<><AiOutlineUser/><span> </span>{loggedInContext.loggedIn ? user?.email : ""}</>} id="navbarScrollingDropdown">
                                {loggedInContext.loggedIn ? 
                                    <>
                                        <NavDropdown.Item as={Link} to='/account-info'>Account Info</NavDropdown.Item>
                                        <NavDropdown.Divider />
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
            <Container>
                <Outlet/>
            </Container>
        </LayoutDiv>
    )
}


const LayoutDiv = styled.div`
    a{
        text-decoration: none;
        color:#000000;
    }
`