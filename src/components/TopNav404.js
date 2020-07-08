import React, { Component } from 'react';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import '../styles/components.css';
import logo from '../assets/images/logos/salon-wordmark-white.svg';

class TopNav404 extends Component {

    render() {
        return (

        <div className="top-nav nav-404">    
            <Navbar collapseOnSelect className="navbar" expand="lg">
            <Navbar.Brand href="/">
                <img src={logo}
                alt="Salon logo"></img>
            </Navbar.Brand>
            </Navbar>
        </div>
        );
    }
}

export default TopNav404;