import React, { Component } from 'react';
import '../styles/styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class Footer extends Component {

    render() {
        return (
                <div className="footer text-center">
                    <a
                        href="https://github.com/ashleyallphin/Salon-Final_Project"
                        target="_blank"
                        rel="noopener noreferrer">
                    <FontAwesomeIcon icon={["fab", "github"]} />
                    </a>
                    <h5>&copy; 2020 Salon, Inc. All rights reserved.</h5>
                </div>
                    );
    }
}

export default Footer;