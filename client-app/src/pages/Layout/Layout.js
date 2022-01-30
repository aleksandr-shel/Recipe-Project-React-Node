
import React from 'react';

import {Link, Outlet} from 'react-router-dom';
import './Layout.css';


export default function Layout(){
    return (
        <div>
            <nav className="navbar">
                <Link to="/">Recipes</Link>
                <Link to="/random-recipe">Random Recipe</Link>

                <div className="dropdown">
                    <div className="dropbtn"><i className="fas fa-user-circle"></i></div>
                    <div className="dropdown-content">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </div>
    )
}