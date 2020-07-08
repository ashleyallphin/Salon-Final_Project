import React, { Component } from "react";
import { isAuthenticated } from '../api/authentication-api';
import { Redirect, Link } from 'react-router-dom';
import { read } from '../api/user-api';
import DefaultProjectImage from '../assets/images/default_pics/salon-default-project-pic.png';
import { listProjectsByUser } from "../api/post-api";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
// import wip from '../assets/images/default_pics/WIP.svg';

class UserProjectCard extends Component {

    constructor() {
    super();
    this.state = {
        redirectToSignin: false,
        error: "",
        posts: []
    };
    }

    init = username => {
        const token = isAuthenticated().token;
        read(username, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                this.setState({ user:data });
                this.loadPosts(data.username);
            }
        });
    };

    loadPosts = username => {
        const token = isAuthenticated().token;
        listProjectsByUser(username, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts:data });
            }
        });
    };

    componentDidMount() {
        const username = this.props.match.params.username;
        this.init(username);
    }

    componentWillReceiveProps(props) {
        const username = props.match.params.username;
        this.init(username);
    }

    // renderProjects = () => {

    //     return (

    //         <div className="projects container fluid">
            
    //     </div>
    
        
    //     )
        
        
    //     };

        render() {

            const { redirectToSignin, user, posts } = this.state;
            if (redirectToSignin) return <Redirect to="/login" />;

            return (
            <>
                
                

            </>
        );
    }
}

export default UserProjectCard;