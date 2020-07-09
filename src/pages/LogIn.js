import React, { Component } from 'react';
import '../styles/pages.css';
import LogInForm from '../components/LogInForm';

class LogIn extends Component {

    componentDidMount() {
        document.title = `Salon: Log In`;
    }

    render() {
        return (
                <div className="page">
                <LogInForm />
                </div>
        );
    }
}

export default LogIn;