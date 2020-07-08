import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore, faHome } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Redirect, Link } from 'react-router-dom';
import { read } from '../api/user-api';
import { isAuthenticated } from '../api/authentication-api';
import DefaultProfilePic from '../assets/images/default_pics/salon-default-profile-pic.png';
import UserGallery from '../components/UserGallery';

class Profile extends Component {
    constructor () {
        super()
        this.state = {
            user: "",
            redirectToSignIn: false
        };
    };

    init = (username) => {
        const token = isAuthenticated().token
        read(username, token)
        .then(data => {
            if (data.error) {
                this.setState({ redirectToSignin:true });
            } else {
                this.setState({ user:data });
            }
        });
    };

    componentDidMount() {
        const username = this.props.match.params.username;
        this.init(username);
    }

    // upload current logged in user data on return to studio from navbar from someone else's studio
    componentWillReceiveProps(props) {
        const username = props.match.params.username;
        this.init(username);
    }

    render() {

        const { redirectToSignIn, user } = this.state;
        if(redirectToSignIn) return <Redirect to="/login" />

        const profileImageURL = user.username
        ? `/user/image/${user.username}?${new Date().getTime()}`
        : DefaultProfilePic;

        return (
            
            <> 
            <div className="profile-section">
				
                    <div className="section-title">
                        {user.username}'s Profile
                    </div>

                    <Card
                    className="profile-card">
                        
                        <Card.Img
                            className="profile-image"
                            src={profileImageURL}
                            alt={user.username}
                            onError = {i => (i.target.src = `${DefaultProfilePic}`)}>
                            </Card.Img>
                        
                        <Card.Body
                        className="profile-card-body"
                        >

                            <h2>{user.username}</h2>
                            
                            <h3>{user.location}</h3>

                            <h4>{user.bio}</h4>

                            <div className="flex-div">

                            <a
                            className="profile-link-icon"
                            href={`http://${user.websiteURL}`}
                            rel="noopener noreferrer"
                            target="_blank">
                                <FontAwesomeIcon icon={faHome} />
                            </a>
                            <a
                            className="profile-link-icon"
                            href={`http://${user.shopURL}`}
                            rel="noopener noreferrer"
                            target="_blank">
                                <FontAwesomeIcon icon={faStore} />
                            </a>
                            <a
                            className="profile-link-icon"
                            href={`http://instagram.com/${user.instagramHandle}`}
                            rel="noopener noreferrer"
                            target="_blank">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a
                            className="profile-link-icon"
                            href={`http://twitter.com/${user.twitterHandle}`}
                            rel="noopener noreferrer"
                            target="_blank">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>

                        </div>

                        {isAuthenticated().user &&
                            isAuthenticated().user._id === user._id && (

                                <div className="flex-div">
                                
                                <Link to={`/artist/edit/${user.username}`}>
                                    <Button className="edit-profile-button"
                                    variant="primary">
                                    Edit Profile
                                    </Button>
                                </Link>
                                    
                                <Link to={`/artist/upload/${user.username}`}>
                                    <Button className="upload-project-button"
                                    variant="primary">
                                    Upload a Project
                                    </Button>
                                </Link>
                                
                                </div>
                            )}
                            
                            {isAuthenticated().user &&
                            isAuthenticated().user._id !== user._id && (

                                <div className="flex-div">
                                
                                <a href="http://paypal.com">
                                    <Button className="edit-profile-button"
                                    variant="primary">
                                    Donate to Artist
                                    </Button>
                                </a>
                                
                                </div>
                            )}

                        </Card.Body>

                    </Card>

				</div>  

            <UserGallery />

            </>          

        )
    }
}

export default Profile