import React, { Component } from 'react';
import '../styles/components.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import logo from '../assets/images/logos/salon-icon-red.svg';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import { logIn, authenticate } from '../api/authentication-api';


class LogInForm extends Component {
    constructor() {
        super();
        // initial state
        this.state = {
            username: "",
            password: "",
            error: "",
            redirectToReferer: false
        }
    };

    // record values of input fields
    handleChange = (name) => (event) => {
        this.setState({error: ""});
        // array syntax -- will dynamically pick up values for all fields
        this.setState({ [name]: event.target.value });
    };

    // grab data when sign up button is pressed to send to backend
    submitLogIn = event => {
        event.preventDefault();
        const { username, password } = this.state;
        const user = {
            username: username,
            password: password
        };
        console.log(user);
        logIn(user).then(data => {
            // sets the errors as data so we can return it to the client
            if(data.error) {
                this.setState({ error: data.error });
            } else {
                // authenticate user
                authenticate(data, () => {
                    // set redirect state to true
                    this.setState({ redirectToReferer: true });
                });
            };
        });
    };

    LogInInputFields = ( username, password ) => (

        <Form.Group>   
                            
            <Form.Control
                onChange={this.handleChange("username")}
                value={this.state.username}
                id="username-input" type="text" placeholder="username" />
            <Form.Control
                onChange={this.handleChange("password")}
                value={this.state.password}
                id="password-input" type="password" placeholder="password" />
            <div className="buttons">
            <div className="flex-div">
                
                <Button onClick={this.submitLogIn} id="log-in-button">Log In</Button>{' '}
                
                <Button href="/signup"  id="sign-up-link-button">Sign Up</Button>{' '}
            
            </div>
            </div>

            <div className="text-links">
            <a href="/">
                <p>forgot password?</p>
            </a>
        </div>
        
        </Form.Group>
    );

    render() {

        const { username, password, error, redirectToReferer } = this.state;

        if(redirectToReferer) {
            return <Redirect to={`/artist/studio/${this.state.username}`} />
        }

        return (
            <div className="component">

                <Jumbotron fluid className="jumbotron" >
                    <div className="vertical-center ">
                        <img
                        alt="Salon Icon"
                        src={logo}
                    />{' '}
                    <h1>bonjour</h1>
                        
                        <div
                            className="form-message-error text-center"
                            style={{ display: error ? "" : "none"}}>    
                                { error }
                        </div>
                        
                    </div>
                    
                    
                </Jumbotron>

                {/* renders form from above */}
                {this.LogInInputFields( username, password )}
            
            </div>


        );
    };
}

export default LogInForm;