import React, { Component } from 'react';

class GalleryTest extends Component {

    componentDidMount() {
        document.title = `Salon: Gallery`;
    }

    render() {
        return (
            
            <div className="gallery-section">
                <h1>gallery test</h1>
            </div>

        );
    }
}

export default GalleryTest;