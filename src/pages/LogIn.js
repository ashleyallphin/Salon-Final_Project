import React, { Component } from 'react';
import '../styles/pages.css';
import LogInForm from '../components/LogInForm';

class LogIn extends Component {

    componentDidMount() {
        document.title = `Salon: Log In`;
    }

    render() {
        return (
                <>
                <LogInForm />
                </>
        );
    }
}

export default LogIn;