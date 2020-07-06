import React, { Component } from 'react';
import '../styles/pages.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import logo from '../assets/images/salon-404.svg'

class PageNotFound extends Component {

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