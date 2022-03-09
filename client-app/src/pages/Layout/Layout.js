
import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import {useLoggedInContext } from '../../Context/LoggedInContext';
import { useUser } from '../../Auth/useUser';
import {Navbar, Container, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {AiOutlineUser} from 'react-icons/ai';
import styled from 'styled-components';

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
                <Container fluid>
                    <Navbar.Brand href="/">ALL RECIPES</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link><Link to="random-recipe">Random Recipe</Link></Nav.Link>
                            <Form className="d-flex">
                                <FormControl
                                type="search"
                                placeholder="Search for Recipe"
                                className="me-2"
                                aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Nav>
                        <NavDropdown style={{marginRight:'5%'}} title={<><AiOutlineUser/><span> </span>{loggedInContext.loggedIn ? user?.email : ""}</>} id="navbarScrollingDropdown">
                                {loggedInContext.loggedIn ? 
                                    <>
                                        <NavDropdown.Item><Link to="/account-info">Account Info</Link></NavDropdown.Item>
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
            <Outlet/>
        </LayoutDiv>
    )
}


const LayoutDiv = styled.div`
    a{
        text-decoration: none;
        color:#000000;
    }
`