import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { postFeedback, deleteFeedback } from '../api/post-api';
import { isAuthenticated } from '../api/authentication-api';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class FeedbackForm extends Component {

    state = {
        text: "",
        error: ""
    };

    handleChange = event => {
        this.setState({ error:"" })
        this.setState({ text:event.target.value });
    };

    isValid = () => {
        const { text } = this.state;
        if (!text.length > 0) {
            this.setState({
                error:
                    "Comments must be between 1 and 300 characters long."
            });
            return false;
        }
        return true;
    };

    submitFeedback = e => {
        e.preventDefault();
        console.log('hitting submitFeedback method')

        if (!isAuthenticated()) {
            this.setState({ error: "Please sign in to leave feedback for this artist." });
            return false;
        }
        
        if (this.isValid()) {
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
        });
        }
    }



    // passing
    deleteComment = comment => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;
        // passing
        deleteFeedback(userId, token, postId, comment).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                // not getting an error
                this.props.updateComments(data.comments);
            }
        });
    };

    // passing
    deleteConfirmed = comment => {
        let answer = window.confirm(
            "Are you sure you want to delete your comment?"
        );
        if (answer) {
            this.deleteComment(comment);
        }
    };



    render() {

        const { comments } = this.props;
        const { error } = this.state;

        return (
            <div className="component">
                
                <form className="feedback-form"> 
                    <h2 className="ml-2 mb-2">What do you think?</h2> 

                    <div
                        className="form-message-error text-center"
                        style={{ display: error ? "" : "none"}}>    
                            { error }
                        </div>

                    <textarea
                        type="text"
                        onChange={this.handleChange}
                        placeholder="leave feedback here"
                        className="form-control"
                        id="feedback"
                        value={this.state.text}
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

                                    {isAuthenticated().user &&
                                    isAuthenticated().user._id ===
                                        comment.postedBy._id && (
                                        <>
                                            <div
                                            className="delete-comment"
                                            onClick={() =>
                                                this.deleteConfirmed(comment)}>
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </div>
                                        </>
                                        )}
                                        {new Date(comment.created).toDateString()}
                                        </div>
                                
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