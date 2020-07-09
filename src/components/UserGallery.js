import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import DefaultProjectImage from '../assets/images/default_pics/salon-default-project-pic.png';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../api/authentication-api';
// import UserProjectCard from '../components/UserProjectCard';

class UserGallery extends Component {
    
    
    
    render() {
        const { posts } = this.props
        return (

            <>

            <div className="projects container fluid">

        {posts.map((post, i) => (
            
                <Card
                className="project-card card"
                key={i}>
                
                <Card.Img
                    className="project-image"
                    src={`/post/image/${post._id}`}
                    alt={post.title}
                    onError = {i => (i.target.src = `${DefaultProjectImage}`)} />
                
                    <Card.Body
                    className="project-card-body ">
                    
                    <Card.Title className="project-name">
                        <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={`http://${post.projectLink}`}>
                            <h1>{post.title},&nbsp;</h1>
                        </a>
                        <p className="project-date">{post.projectYear}</p>
                    </Card.Title>
                    
                    <Card.Text className="project-artist">
                    By&nbsp;
                    <Link
                        className="project-artist"
                        to={`/artist/studio/${post.postedBy.username}`}>
                        {post.postedBy.username}
                    </Link>
                    </Card.Text>

                    <Card.Text className="project-description">
                    {post.body}
                    </Card.Text>


                    <Card.Text className="project-materials">
                    {post.projectMedium}
                    </Card.Text>

                    <div className="project-card-buttons">
                        <Link to={`/gallery/${post._id}`}>
                            <Button
                                className="view-feedback-button"
                                variant="primary">
                                Visit Project</Button>
                        </Link>

                    
                            {isAuthenticated().user &&
                            isAuthenticated().user._id === post.postedBy._id && (

                                <Button
                            className="delete-project-button"
                            variant="primary">
                            Delete Project</Button>
                            )}
                            
                            {/* {isAuthenticated().user &&
                            isAuthenticated().user._id !== user._id && (

                                <div className="flex-div">
                                
                                <a href="http://paypal.com">
                                    <Button className="edit-profile-button"
                                    variant="primary">
                                    Donate to Artist
                                    </Button>
                                </a>
                                
                                </div>
                            )} */}
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    </div>

                    {/* <div className="flex-grow"></div> */}

                    <Card.Text className="project-tags">
                    Submitted to Salon: {new Date(post.posted).toDateString()}
                    <br></br>
                    Tags:&nbsp;{post.projectTags}
                    </Card.Text>
                
                </Card.Body>
            
            </Card>
))}
        
        </div>
        </>
        
        )
    
    };
    }


export default UserGallery;