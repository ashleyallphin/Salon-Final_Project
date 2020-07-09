import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { postFeedback, deleteFeedback } from '../api/post-api';
import { isAuthenticated } from '../api/authentication-api';
import DefaultProfilePic from '../assets/images/default_pics/salon-default-profile-pic.png';
import { Link } from 'react-router-dom';

class FeedbackForm extends Component {

    state = {
        text: ""
    };

    handleChange = event => {
        this.setState({ text:event.target.value });
    };

    submitFeedback = e => {
        e.preventDefault();
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;
        const comment = {text: this.state.text};
        
        console.log("getting comment: ", comment);

        postFeedback (userId, token, postId, comment)
        .then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                console.log(data);
                this.setState({ text:'' });
                // dispatch fresh list of comments to parent component
                this.props.updateComments(data.comments);
            }
        })
    }


    render() {

        const { comments } = this.props;

        return (
            <div className="component">
                
                <form className="feedback-form"> 
                    <h2 className="ml-2 mb-2">What do you think?</h2>                    
                    <textarea
                        type="text"
                        onChange={this.handleChange}
                        placeholder="leave feedback here"
                        className="form-control"
                        id="feedback"
                        rows="4">
                    </textarea>
                    <div
                    className="project-card-buttons">
                        <Button
                        onClick={this.submitFeedback}
                        className="submit-feedback-button ml-auto"
                        variant="primary">
                        Submit Feedback
                        </Button>
                    </div>

                    <div>
                    <h2 className="ml-2 mb-2 mt-4">Comments</h2>
                    <Card>
                    <Card.Body>
                    <div className="rendered-comments">
                    
                
                        
                        {comments.map((comment, i) => (
                            <div key={i}>
                                <div className="single-comment">
                                
                                <div className="comment-poster">
                                <Link
                                to={`/artist/studio/${comment.postedBy.username}`}>
                                    {comment.postedBy.username}
                                </Link>
                                &nbsp;said:
                                </div>

                                <div className="comment-text">
                                {comment.text}
                                </div>
                                
                                <div className="comment-date">
                                {new Date(comment.created).toDateString()}</div>
                                </div>
                            </div>
                        ))}
                        
                        </div>

                    </Card.Body>
                    </Card>
                
                </div>
                
                </form>

            </div>
        )
    }
}
export default FeedbackForm