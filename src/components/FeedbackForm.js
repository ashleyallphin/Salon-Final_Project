import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class CommentInputField extends Component {
    render() {
        return (
                <div className="component">
                       
                    <form className="feedback-form"> 
                    <h2 className="ml-2 mb-2">What do you think?</h2>                    
                    <textarea
                    placeholder="leave feedback here" className="form-control"
                    id="feedback"
                    rows="4"></textarea>

                    <div
                    className="project-card-buttons">
                                <Button
                                    className="submit-feedback-button ml-auto"
                                    variant="primary">
                                    Submit Feedback
                                    </Button>


                            {/* <Button
                                className="edit-project-button"
                                variant="primary">
                                Edit Project</Button> */}
                        </div>
                    
                    </form>
                    
                </div>
        )
    }
}
export default CommentInputField