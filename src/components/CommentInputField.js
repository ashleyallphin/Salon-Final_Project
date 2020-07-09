import React, { Component } from 'react'
import Form from 'react-bootstrap/FormControl';


class FeedbackForm extends Component {
    render() {
        return (
                <div className="component">
                    <div>
                        
                    <form className="feedback-form">
                    
                    <textarea
                    placeholder="leave feedback here" className="form-control"
                    id="TextArea"
                    rows="3"></textarea>
                    
                    </form></div>
                </div>
        )
    }
}
export default FeedbackForm