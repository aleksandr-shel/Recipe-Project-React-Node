
import React from 'react';

import {Link, Outlet} from 'react-router-dom';
import styled from 'styled-components';

import { useState } from 'react';
import {useLoggedInContext } from '../../Context/LoggedInContext';
import { useUser } from '../../Auth/useUser';

export default function Layout(){
    const [dropdownShow, setDropdownShow] = useState(false)

    const user = useUser()
    const loggedInContext = useLoggedInContext()

    function logOut(){
        localStorage.removeItem('token')
        loggedInContext.setLoggedIn(false)
    }

    return (
        <LayoutNav>
            <nav className="navbar">
                <Link to="/">Recipes</Link>
                <Link to="/random-recipe">Random Recipe</Link>

                <div className="dropdown" onClick={()=>setDropdownShow(true)} onMouseLeave={()=>setDropdownShow(false)}>
                    <div className="dropbtn"><i className="fas fa-user-circle"></i></div>
                    <div style={{display:dropdownShow?'block':'none'}} className="dropdown-content">
                        {
                            !loggedInContext.loggedIn ?
                        <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                        </>
                        :
                        <div className="logout-btn" onClick={logOut} >Logout</div>
                        }
                    </div>
                </div>
            </nav>
           
            <Outlet/>
        </LayoutNav>
    )
}

const navbgc = '#3cab54',
    navlinktextcolor = 'black',
    navlinkhover = 'darkgray',
    navdropdownhover = 'lightgray'

const LayoutNav = styled.div`

    .navbar{
        display: flex;
        justify-content: center;
        background-color: ${navbgc};
        margin:0;
        padding:0;
        overflow: hidden;
    }

    .navbar a{
        display: inline-block;
        color:white;
        text-decoration: none;
        padding: 15px;
        margin:0 2px;
    }

    .navbar > a:hover{
        background-color: ${navlinkhover};
        color: ${navlinktextcolor};
    }
    .dropbtn{
        width: 60px;
        text-align: center;
        display:block;
        padding:8px;
        margin:0px;
    }

    div.dropbtn {
        padding: 15px;
    }
    .dropdown:hover .dropbtn{
        background-color: ${navlinkhover};
    }

    .dropdown-content{
        background-color: ${navdropdownhover};
        z-index: 1;
        display: none;
        position: absolute;
    }

    .dropdown-content a{
        margin: 0;
        text-align: center;
        width: 60px;
        display:block;
        color:black !important;
    }
    .dropdown-content a:hover{
        background-color: ${navlinkhover};
    }

    .logout-btn{
        margin: 0;
        padding:15px;
        text-align: center;
        width: 60px;
        cursor:pointer;
        display:block;
        color:black !important;
    }import { useUser } from './../../Auth/useUser';



    .logout-btn:hover{
        background-color: ${navlinkhover};
    }
`