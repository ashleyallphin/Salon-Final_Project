import React, { Component } from 'react';
import '../styles/components.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import logo from '../assets/images/logos/salon-icon-red.svg'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { signUp } from '../api/authentication-api';

class SignUpForm extends Component {
    constructor() {
        super()
        // initial state
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            error: "",
            success: false
        }
    };

    // record values of input fields
    handleChange = (name) => (event) => {
        this.setState({error: ""});
        // array syntax -- will dynamically pick up values for all fields
        this.setState({ [name]: event.target.value })
    };

    // grab data when sign up button is pressed to send to backend
    submitSignUp = event => {
        event.preventDefault();
        const { firstName, lastName, email, username, password } = this.state;
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password
        };
        console.log(user);
        signUp(user).then(data => {
            // sets the errors as data so we can return it to the client
            // sets the success state to true to show the sign up confirmation message
            if(data.error) this.setState({ error: data.error });
                else
                    this.setState({
                        error: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        username: "",
                        password: "",
                        success: true
                    });
        });
    };

    signUpInputFields = ( firstName, lastName, email, username, password) => (

        <Form.Group>   
                            
            <Form.Control
                onChange={this.handleChange("firstName")}
                value={this.state.firstName}
                id="first-name-input" type="text" placeholder="first name" />
            <Form.Control
                onChange={this.handleChange("lastName")}
                value={this.state.lastName}
                id="last-name-input" type="text" placeholder="last name" />
            <Form.Control
                onChange={this.handleChange("email")}
                value={this.state.email}
                id="email-input" type="email" placeholder="email address" />
            <Form.Control
                onChange={this.handleChange("username")}
                value={this.state.username}
                id="username-input" type="text" placeholder="username" />
            <Form.Control
                onChange={this.handleChange("password")}
                value={this.state.password}
                id="password-input" type="password" placeholder="password" />
            <div className="buttons">
            <Button 
                onClick={this.submitSignUp}
                id="sign-up-button">Sign Up</Button>{' '}
            </div>

            <div className="text-links">
            <a href="/">
                <p>return to log in page</p>
            </a>
        </div>
        
        </Form.Group>
    );

    render() {

        const { firstName, lastName, email, username, password, error, success } = this.state;

        return (
            <div className="component">

                <Jumbotron fluid className="jumbotron" >
                    <div className="vertical-center ">
                        <img
                        alt="Salon Icon"
                        src={logo}
                    />{' '}
                    <h1>sign up</h1>
                        
                        <div
                            className="form-message-error text-center"
                            style={{ display: error ? "" : "none"}}>    
                                { error }
                        </div>

                        <div
                            className="form-message-success text-center"
                            style={{ display: success ? "" : "none"}}>
                                <h1>oui!</h1>    
                                You've joined Salon. Please <Link to="/login">log in</Link> to your account to continue.
                        </div>

                        
                    </div>
                    
                    
                </Jumbotron>

                {/* renders form from above */}
                {this.signUpInputFields( firstName, lastName, email, username, password)}
            
            </div>


        );
    };
}

export default SignUpForm;