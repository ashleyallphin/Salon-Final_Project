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
                    
                    {/* {JSON.stringify((this.state.post))} */}

                    {/* <div className="project-artist">
                    {post.postedBy.user._id}
                    </div> */}


                    <div className="single-project-description">
                    {post.body}
                    </div>

                    <div className="single-project-category">
                    {post.projectCategory}
                    </div>

                    <div className="single-project-materials">
                    {post.projectMedium}
                    </div>

                    <div className="single-project-status">
                    {post.projectStatus}
                    </div>
                    
                    </Container>
                </Jumbotron>
                
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