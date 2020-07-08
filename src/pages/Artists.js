import React, { Component } from "react";
import { listArtists } from "../api/user-api";
import DefaultProfilePic from '../assets/images/default_pics/salon-default-profile-pic.png';
import { Link } from 'react-router-dom';


class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        document.title = 'Salon: Artists';
        listArtists().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users:data });
            }
        });
    }

    renderArtists = (users) => (
        
        <div className="row">
                    
        {users.map(( user, i) => (
            
            <div className="card col-md-6" key={i}>
            
            <img
                    className="edit-profile-image"
                    src={`/user/image/${user.username}`}
                    alt={user.username}
                    onError = {i => (i.target.src = `${DefaultProfilePic}`)}
                >
                </img>
            
                <div className="card-body">
                    <h2 className="card-title">{user.username}</h2>
                    <p className="card-text">
                    
                    <p>
                        Display user email until add option to fill out bio.<br></br>
                        {user.email}
                    </p>
                    
                    </p>
                    
                    <Link to={`/artist/studio/${user.username}`}
                    className="btn visit-studio-button">
                    Visit Studio
                    </Link>

                </div>

            </div>
        ))}

        </div>
    )

    

    render() {

        const { users } = this.state;

        return (
            
            <div className = "container">

                <h1>Users</h1>
                
                {this.renderArtists(users)}

            </div>
        );
    }
}

export default Users;