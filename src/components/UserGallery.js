import React, { Component } from 'react';
import UserProjectCard from '../components/UserProjectCard';

class UserGallery extends Component {

    componentDidMount() {
        document.title = `Salon: Gallery`;
    }

    render() {

        const { posts } = this.props

        return (
                <div class="page">
                <div className="section-title">
                <span>username's profile</span>
                </div>
                <div className="flex-grow"></div>
                    <h1>render user projects below</h1>
                    {JSON.stringify(posts)}
                    {/* <UserProjectCard /> */}
                </div>
        );
    }
}

export default UserGallery;