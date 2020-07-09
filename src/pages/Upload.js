import React, { Component } from 'react';
import '../styles/styles.css';
import UploadProjectForm from '../components/UploadProjectForm';


class Upload extends Component {

    componentDidMount() {
        document.title = 'Salon: Upload Project';
    }

    render() {
        return (
            <div className="page">
                <UploadProjectForm />
            </div>
        );
    }
}

export default Upload;