import React, { Component } from 'react';
import '../styles/Components.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import logo from '../assets/images/salon-icon-red.svg'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
            welcome: true,
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
        this.signUp(user)
        .then(data => {
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
                        success: true,
                        welcome: false
                    });
        });
    };

    signUp = (user) => {
        return fetch("/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
    };

    signUpInputFields = ( firstName, lastName, email, username, password) => (

        <Form.Group>   
            <h1 className="text-center">sign up</h1>            
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

        const { firstName, lastName, email, username, password, error, success, welcome } = this.state;

        return (
            <div className="component">

                <Jumbotron fluid className="jumbotron" >
                    <div className="vertical-center ">
                        <img
                        alt="Salon Icon"
                        src={logo}
                    />{' '}

                        <p
                            className="form-message-error text-center"
                            style={{ display: error ? "" : "none"}} >
                                { error }
                        </p>

                        <p
                            className="form-message-success text-center"
                            style={{ display: success ? "" : "none"}}>
                                <h1>oui!</h1>
                                You've joined Salon! Please log in to your account to continue.
                        </p>

                        
                    </div>
                    
                    
                </Jumbotron>

                {/* renders form from above */}
                {this.signUpInputFields( firstName, lastName, email, username, password)}
            
            </div>


        );
    };
}

export default SignUpForm;