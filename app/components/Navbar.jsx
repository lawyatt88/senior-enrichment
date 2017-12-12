import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'

export default function Navbar (props) {
    return (
        <nav>
            <Link className="naconst vbar-brand" to="/">LOGO</Link>
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/campuses">Campuses</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/students">Students</Link>
                </li>
            </ul>
        </nav>
    )    
}
