import React, { Component } from 'react';
import { listOneProject }  from '../api/post-api';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DefaultProjectImage from '../assets/images/default_pics/salon-default-project-pic.png';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import Jumbotron from 'react-bootstrap/Jumbotron'
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container'
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";

class SingleProject extends Component {
    
    state = {
        post: ''
    }

    componentDidMount = () => {
        document.title = `{post.title}`;
        const postId = this.props.match.params.postId
        listOneProject(postId).then(data => {
            // console.log("hitting listOneProject from SingleProject component")
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState( { post:data });
            }
            // console.log("sending username from page:", this.state.post.postedBy.username);
            console.log(this.state.post);
        });
    }

    renderProject = (post) => {
        
        // const artistId = post.postedBy
        //     ? `/studio/${post.postedBy.username}`
        //     : '';
        // const artistUsername = post.postedBy
        //     ? post.postedBy.username
        //     : "Unknown";
        
        return (

            <div className="single-project container text-center">
                <SimpleReactLightbox>   
                
                <SRLWrapper>
                <Image
                    src={`/post/image/${post._id}`}
                    alt={post.title}
                    onError = {i => (i.target.src = `${DefaultProjectImage}`)}
                    className="single-project-image"
                    fluid>
                </Image>
                </SRLWrapper>

                <Jumbotron fluid>
                    <Container>
                    
                    <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={`http://${post.projectLink}`}>
                        <h1>{post.title}</h1>
                    </a>

                    <div className="project-description">
                                {post.body}</div>

                    </Container>
                </Jumbotron>

                <h2> text field for feedback form here</h2>
                    {/* <Card
                        className="project-card card">
                            

                            
                            <Card.Img
                                variant="top" 
                                className="project-image"
                                src={`/post/image/${post._id}`}
                                alt={post.title}
                                onError = {i => (i.target.src = `${DefaultProjectImage}`)} > */}

                                {/* apply this image overlay if work in progress */}
                                {/* <div className="card-img-overlay wip">
                                <img className="wip-icon" src={wip}
                                alt="work in progress"></img>
                                </div> */}
                            {/* </Card.Img> */}




                                {/* <Card.Body
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
                                By&nbsp; */}
                                {/* <Link
                                    className="project-artist"
                                    to={`/artist/studio/${post.postedBy.username}`}>
                                {post.postedBy.username}
                                </Link> */}
                                {/* </Card.Text>

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
                                            Leave Feedback</Button>
                                        </Link> */}

                                    {/* <Button
                                        className="edit-project-button"
                                        variant="primary">
                                        Edit Project</Button> */}
                                {/* </div>

                                <div className="flex-grow"> 
                                </div>

                                <Card.Text className="project-tags">
                                Tags:&nbsp;{post.projectTags}
                                </Card.Text>
                            
                            </Card.Body>
                        
                        </Card> */}

                </SimpleReactLightbox>
                </div>



        )
    }

    render() {

        const {post} = this.state

        return (

            <>
                <div className="section-title">
                    {/* {`${post.postedBy.username} `} */}
                    by OH MAN I AM SO FRUSTRATED
                </div>
                {this.renderProject(post)}
            </>
        )
    }
}

export default SingleProject