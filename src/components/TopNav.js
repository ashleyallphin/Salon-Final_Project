import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { isAuthenticated, logout } from '../api/authentication-api';
import '../styles/components.css';
import logo from '../assets/images/logos/salon-wordmark-white.svg';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import NavDropdown from 'react-bootstrap/NavDropdown';

const TopNav = ({ history }) => (

        <div className="top-nav">
            <Navbar collapseOnSelect expand="lg">
                {/* salon logo */}
                <Navbar.Brand>
                <img src={logo} alt="Salon logo"></img>
                </Navbar.Brand>
                
                {!isAuthenticated() && (
                    <></>
                )}

                {isAuthenticated() && (
                    <>
                    <Navbar.Toggle
                    aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {/* <Nav.Link><Link to="/login">Log In</Link></Nav.Link>
                        <Nav.Link><Link to="/signup">Sign Up</Link></Nav.Link>
                        <Nav.Link><Link to="/signup">Gallery</Link></Nav.Link> */}
                                {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Nav>
                        {/* <Nav.Link>
                            <NavLink
                                activeClassName="navbar-active"
                                className="nav-link" to="/login">
                                Log In
                            </NavLink>
                        </Nav.Link >
                        <Nav.Link>
                            <NavLink
                                activeClassName="navbar-active"
                                className="nav-link" to="/signup">
                                Sign Up
                            </NavLink>
                        </Nav.Link> */}
                        <Nav.Link>
                            <NavLink
                                activeClassName="navbar-active"
                                className="nav-link" to="/gallery">
                                Gallery
                            </NavLink>
                        </Nav.Link>
                        <Nav.Link>
                            <NavLink
                                activeClassName="navbar-active"
                                className="nav-link"
                                to={`/artist/studio/${isAuthenticated().user.username}`}
                            >
                                Studio
                            </NavLink>
                        </Nav.Link>
                        <Nav.Link>
                            <div
                                className="nav-link" 
                                onClick={() => logout(() => history.push("/login"))}>
                                    Logout
                            </div>
                        </Nav.Link>
                    </Nav>
                    {/* <Form inline>
                        <FormControl 
                            type="text"
                            placeholder="Search"
                            className="search-input-field"
                        />
                        <Button className="search-button">
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </Form> */}
                </Navbar.Collapse>
                </>

                )}

            </Navbar>
        </div>

)

export default withRouter(TopNav)