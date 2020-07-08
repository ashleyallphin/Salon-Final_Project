import React, { Component } from 'react';
import '../styles/components.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class Footer404 extends Component {

    render() {
        return (
                <div className="footer text-center footer-404">
                    <a
                        href="https://github.com/ashleyallphin/"
                        target="_blank"
                        rel="noopener noreferrer">
                    <FontAwesomeIcon icon={["fab", "github"]} />
                    </a>
                    <h5>&copy; 2020 Salon, Inc. All rights reserved.</h5>
                </div>
                    );
    }
}

export default Footer404;