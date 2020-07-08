import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import { isAuthenticated } from '../api/authentication-api';
import { read, updateAccount } from '../api/user-api';
import { Redirect } from 'react-router-dom';
import DeleteUserButton from '../components/DeleteUserButton';
import Jumbotron from 'react-bootstrap/Jumbotron';
import bsCustomFileInput from 'bs-custom-file-input';

class EditProfile extends Component {

    constructor() {
        super()
        this.state = {
            id: "",
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            redirectToStudio: false,
            error: "",
            fileSize: 0,
            location: "",
            bio: "",
            websiteURL: "",
            twitterHandle: "",
            instagramHandle: "",
            shopURL: "",
            PayPalUsername: ""
        }
    }

    init = (username) => {
        const token = isAuthenticated().token
        read(username, token)
        .then(data => {
            if (data.error) {
                this.setState({ redirectToStudio:true });
            } else {
                this.setState({ 
                    id: data._id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    username: data.username,
                    location: data.location,
                    bio: data.bio,
                    websiteURL: data.websiteURL,
                    twitterHandle: data.twitterHandle,
                    instagramHandle: data.instagramHandle,
                    shopURL: data.shopURL,
                    PayPalUsername: data.PayPalUsername
                });
            }
        });
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value = name === "profileImage" ? event.target.files[0] : event.target.value;
        const fileSize = name === "profileImage" ? event.target.files[0].size : 0;
        this.userData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    componentDidMount() {
        document.title = 'Salon: Edit Profile';
        bsCustomFileInput.init()
        // for sending the file
        this.userData = new FormData();
        const username = this.props.match.params.username;
        this.init(username);
    }

    // check if the input fields are valid
    isValid = () => {
        const { firstName, lastName, email, password, fileSize } = this.state;
            if ( fileSize > 2000000 ) {
            this.setState({
                error: "Maximum image size is 2MB. Please select a smaller file.", loading: false });
            return false;
            }
            if (firstName.length === 0) {
            this.setState({ error: "First name is required.", loading: false });
            return false;
            }
            if (lastName.length === 0) {
                this.setState({ error: "Last name is required.", loading: false });
                return false;
            }
            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({
                error: "Please enter a valid email address.", loading: false });
            return false;
            }
            if (password.length >= 1 && (password.length < 6 || password.length > 15)) {
            this.setState({
                error: "Password must be between 6 and 15 characters long.",
                loading: false });
            return false;
            }
            return true;
        };

    clickUpdateProfile = event => {
        event.preventDefault();
        this.setState({ loading:true });

        if (this.isValid()) {
            const { username } = this.state;   
            console.log(username)         
            const token = isAuthenticated().token;
            updateAccount(username, token, this.userData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else
                    this.setState ({
                        redirectToStudio: true
                    });
        });
        }
    };

    updateProfileInputFields = (
        firstName,
        lastName,
        email,
        username,
        password,
        location,
        bio, 
        shopURL,
        twitterHandle,
        instagramHandle,
        websiteURL,
        PayPalUsername) => (

        <Form.Group className="text-center">   
            
            <Form>
                <Form.File 
                onChange={this.handleChange("profileImage")}
                id="custom-file"
                type="file"
                accept="image/*"
                label="profile image"
                custom
                />
            </Form>

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
                onChange={this.handleChange("password")}
                value={this.state.password}
                id="password-input" type="password" placeholder="password" />
            <Form.Control
                onChange={this.handleChange("location")}
                value={this.state.location}
                id="location-input" type="text" placeholder="location" />
            <Form.Control
                onChange={this.handleChange("bio")}
                value={this.state.bio}
                id="bio-input" type="text" placeholder="bio"
                as="textarea" rows="3" />
            
            <InputGroup className="input-group">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">http://</InputGroup.Text>
                </InputGroup.Prepend>
            <Form.Control
                onChange={this.handleChange("websiteURL")}
                value={this.state.websiteURL}
                id="websiteURL-input" type="text" placeholder="personal website" />
            </InputGroup>
            
            <InputGroup className="input-group">
            <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">http://</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                    onChange={this.handleChange("shopURL")}
                    value={this.state.shopURL}
                    id="shopURL-input" type="text" placeholder="shop" />
            </InputGroup>

            <InputGroup className="input-group">
            <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                onChange={this.handleChange("twitterHandle")}
                value={this.state.twitterHandle}
                id="twitterHandle-input" type="text" placeholder="twitter handle" />
            </InputGroup>

            <InputGroup className="input-group">
            <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                onChange={this.handleChange("instagramHandle")}
                value={this.state.instagramHandle}
                id="instagramHandle-input" type="text" placeholder="instagram handle" />
            </InputGroup>

            <Form.Control
                onChange={this.handleChange("PayPalUsername")}
                value={this.state.PayPalUsername}
                id="PayPalUsername-input" type="text" placeholder="PayPal username" />
            
            <div className="buttons">
            <Button 
                onClick={this.clickUpdateProfile}
                id="sign-up-button">Update Profile</Button>{' '}
            </div>

            <DeleteUserButton
                // to access the username in the delete user component, from this.state above
                username={username} />

        </Form.Group>
            
    );


    render() {
        
        const {
            firstName,
            lastName,
            email,
            username,
            password,
            redirectToStudio,
            error,
            location,
            bio, 
            shopURL,
            twitterHandle,
            instagramHandle,
            websiteURL,
            PayPalUsername
        } = this.state;
        
        if (redirectToStudio) {
            return <Redirect to={`/artist/studio/${username}`} />;
        }

        return (
            <div className="component text-center">
                
                <Jumbotron fluid className="jumbotron" >
                    <div className="vertical-center">
                        <div className="page page-title">edit profile</div>
                    </div>                    
                
                </Jumbotron>

                <div
                    className="form-message-error text-center"
                    style={{ display: error ? "" : "none"}}>    
                        { error }
                </div>

                {this.updateProfileInputFields( firstName, lastName, email, username, password, location, bio, shopURL, websiteURL, instagramHandle, twitterHandle, PayPalUsername)}
                
            </div>
        );
    };
}

export default EditProfile