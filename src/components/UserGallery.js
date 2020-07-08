import React, { Component } from 'react';
import UserProjectCard from '../components/UserProjectCard';

class UserGallery extends Component {

    componentDidMount() {
        document.title = `Salon: Gallery`;
    }

    render() {
        return (
                <div class="page">
                    <h1>render user projects below</h1>
                    {/* <UserProjectCard /> */}
                </div>
        );
    }
}

export default UserGallery;