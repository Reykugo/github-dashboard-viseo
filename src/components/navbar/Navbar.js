import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Navbar(){

    return (
        <div className="navbar flex flex-row flex-align-center">
            <NavLink to="/"><i className="menu-icon fas fa-bars"></i></NavLink>
            <h1 className="title flex-grow">GITHUB DASHBOARD SAMPLE</h1>
        </div>
    )
    
}