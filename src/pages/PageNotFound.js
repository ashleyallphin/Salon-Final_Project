import React, { Component } from 'react';
import '../styles/pages.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import logo from '../assets/images/logos/salon-404.svg';

class PageNotFound extends Component {

    componentDidMount() {
        document.title = 'Salon: Page Not Found';
    }

    render() {
        return (
            <div className="page">
                    <div className="page-not-found">
                            <Jumbotron fluid className="jumbotron">
                                <div className="vertical-center ">
                                    <img
                                    alt="Salon Icon"
                                    src={logo}
                                    />{' '}
                                    <h1>page not found</h1>
                                </div>
                            </Jumbotron>
                    </div>
            </div>
        );
    }
}

export default PageNotFound;