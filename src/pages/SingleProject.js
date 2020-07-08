import React, { Component } from 'react';
import { listOneProject }  from '../api/post-api';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DefaultProjectImage from '../assets/images/default_pics/salon-default-project-pic.png';
import { Link } from 'react-router-dom';

class SingleProject extends Component {
    
    state = {
        post: ''
    }

    componentDidMount = () => {
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
        
        const artistId = post.postedBy
            ? `/studio/${post.postedBy.username}`
            : '';
        const artistUsername = post.postedBy
            ? post.postedBy.username
            : "Unknown";
        
        return (

            <>
<h2>switch to image on top and info underneath -- maybe add lightbox</h2>
<Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={`/post/image/${post._id}`} />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
  <Card.Body>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>
            
            <Card
                className="project-card card">
                    

                    
                    <Card.Img
                        variant="top" 
                        className="project-image"
                        src={`/post/image/${post._id}`}
                        alt={post.title}
                        onError = {i => (i.target.src = `${DefaultProjectImage}`)} >

                        {/* apply this image overlay if work in progress */}
                        {/* <div className="card-img-overlay wip">
                        <img className="wip-icon" src={wip}
                        alt="work in progress"></img>
                        </div> */}
                    </Card.Img>




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
                        {/* <Link
                            className="project-artist"
                            to={`/artist/studio/${post.postedBy.username}`}>
                        {post.postedBy.username}
                        </Link> */}
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
                                    Leave Feedback</Button>
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



                </>



        )
    }

    render() {

        const {post} = this.state

        return (

            <>
                <div className="section-title">
                    {`${post.title} `}
                    by OH MAN I AM SO FRUSTRATED
                    {/* {this.state.post.postedBy.username} */}
                </div>
                {this.renderProject(post)}
            </>
        )
    }
}

export default SingleProject