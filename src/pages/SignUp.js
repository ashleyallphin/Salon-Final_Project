import React, { Component } from 'react';
import SignUpForm from '../components/SignUpForm';

class SignUp extends Component {

    componentDidMount() {
        document.title = `Salon: Sign Up`;
    }

    render() {
        return (
            <div className="page">
            <SignUpForm />
            </div>
        );
    }
}

export default SignUp;