import React, { Component } from "react";
import { listProjects } from "../api/post-api";
import DefaultProjectImage from '../assets/images/default_pics/salon-default-project-pic.png';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
// import wip from '../assets/images/default_pics/WIP.svg';

class ProjectCard extends Component {

    constructor() {
    super();
    this.state = {
        posts: [],
    };
    }

    componentDidMount() {
    document.title = `Salon: Gallery`;
    listProjects().then((data) => {
        if (data.error) {
        console.log(data.error);
        } else {
        this.setState({ posts: data });
        }
    });
    }

    renderProjects = (posts) => {

        return (

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

                        {/* apply this image overlay if work in progress */}
                        {/* <div className="card-img-overlay wip">
                        <img className="wip-icon" src={wip}
                        alt="work in progress"></img>
                        </div> */}
                    
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

                        <Card.Text className="project-category">
                        {post.projectCategory}
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

                            {/* <Button
                                className="edit-project-button"
                                variant="primary">
                                Edit Project</Button> */}
                        </div>

                        <div className="flex-grow"> 
                        </div>

                        <Card.Text className="project-tags">
                        Tags:&nbsp;{post.projectTags}
                        </Card.Text>
                    
                    </Card.Body>
                
                </Card>
            
            ))}
        </div>
    
        
            )
        
        
        };

    render() {
        const { posts } = this.state;
        return (
        <>
            <div className="section-title">Public Gallery</div>
            {this.renderProjects(posts)}
        </>
    );
}}

export default ProjectCard;