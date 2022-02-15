
import React from 'react';

import {Link, Outlet} from 'react-router-dom';
import './Layout.css';


import { useState } from 'react';

export default function Layout(){
    const [dropdownShow, setDropdownShow] = useState(false)

    return (
        <div>
            <nav className="navbar">
                <Link to="/">Recipes</Link>
                <Link to="/random-recipe">Random Recipe</Link>

                <div className="dropdown" onClick={()=>setDropdownShow(true)} onMouseLeave={()=>setDropdownShow(false)}>
                    <div className="dropbtn"><i className="fas fa-user-circle"></i></div>
                    <div style={{display:dropdownShow?'block':'none'}} className="dropdown-content">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </div>
    )
}