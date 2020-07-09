import React, { Component } from 'react';
import { listOneProject }  from '../api/post-api';
import DefaultProjectImage from '../assets/images/default_pics/salon-default-project-pic.png';
import FeedbackForm from '../components/FeedbackForm';
import Image from 'react-bootstrap/Image'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
// import { Link } from 'react-router-dom';
// import SimpleReactLightbox from 'simple-react-lightbox';
// import { SRLWrapper } from "simple-react-lightbox";


class SingleProject extends Component {
    
    state = {
        post: '',
        comments: []
    }

    componentDidMount = () => {
        document.title = `Salon: Gallery`;
        const postId = this.props.match.params.postId
        listOneProject(postId).then(data => {
            // console.log("hitting listOneProject from SingleProject component")
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState( {
                    post:data,
                    comments:data.comments
                });
            }
            // console.log("sending username from page:", this.state.post.postedBy.username);
            console.log(this.state.post);
        });
    }

    updateComments = comments => {
        this.setState({ comments:comments })
    }

    renderProject = (post) => {
        
        // const artistId = post.postedBy
        //     ? `/studio/${post.postedBy.username}`
        //     : '';
        // const artistUsername = post.postedBy
        //     ? post.postedBy.username
        //     : "Unknown";
        
        return (
            

            <div className="
                fluid
                container
                text-center
                single-project-component
                ">
                
                {/* <SimpleReactLightbox>
                <SRLWrapper> */}
                
                    <Container>
                    <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={`http://${post.projectLink}`}>
                        <h1>{post.title}</h1>
                    </a>
                    </Container>
                
                <Image className="single-project-image"
                    src={`/post/image/${post._id}`}
                    alt={post.title}
                    onError = {i => (i.target.src = `${DefaultProjectImage}`)}
                    fluid>
                </Image>
                {/* </SRLWrapper>
                </SimpleReactLightbox> */}

                <Jumbotron fluid>
                    <Container>
                    
                    <div className="project-description">
                    {post.body}
                    </div>

                    <div className="project-description">
                    {post.body}
                    </div>

                    <div className="project-description">
                    {post.body}
                    </div>

                    <div className="project-description">
                    {post.body}
                    </div>
                    
                    </Container>
                </Jumbotron>


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

                
                </div>
                



        )
    }

    render() {

        const {post, comments, updateComments} = this.state

        return (
            <div className="single-project-section">
                {/* <div className="section-title">
                <span>&nbsp;</span>
                </div> */}
                {this.renderProject(post)}
                <FeedbackForm
                    postId={post._id}
                    comments={comments}
                    updateComments={this.updateComments}
                    />
            </div>
        )
    }
}

export default SingleProject