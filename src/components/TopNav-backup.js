
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/images/logos/salon-wordmark-white.svg';

const TopNav = () => {

    return (
        <div className="top-nav">    
            <Navbar collapseOnSelect className="navbar" expand="lg">
            <Navbar.Brand href="/">
                <img src={logo}
                alt="Salon logo"></img>
            </Navbar.Brand>
            </Navbar>
        </div>
    );
}

export default TopNav;