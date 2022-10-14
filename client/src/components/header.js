import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import auth from '../utils/auth';
import './header.css'


function Header(props) {
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark"id="header" >
            <div className="container" >
                <Link className="navbar-brand" id="title" to="/">View From Here</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <NavLink className="nav-link" to="/" end><li className="nav-item">Home</li></NavLink>
                        {
                            props.loggedIn ? (
                                <>
                                    <NavLink onClick={auth.logout} className="nav-link" to="signup"><li className="nav-item">Logout</li></NavLink>
                                    <NavLink className="nav-link" to="/profile"><li className="nav-item">Profile</li></NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink className="nav-link" to="/login" ><li className="nav-item">Login</li></NavLink>
                                    <NavLink className="nav-link" to="/signup"><li className="nav-item">Signup</li></NavLink>
                                    
                                </>
                            )

                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default Header;