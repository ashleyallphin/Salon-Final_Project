import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { isAuthenticated } from '../api/authentication-api';
import { remove } from '../api/user-api';
import { logout } from '../api/authentication-api';
import { Redirect } from 'react-router-dom';


class DeleteUserButton extends Component {

    state = {
        redirect: false
    }

    deleteUser = () => {
        const token = isAuthenticated().token;
        const username = this.props.username;
        remove(username, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                // signout user
                logout(() => console.log("User deleted successfully."));
                // redirect
                this.setState({ redirect: true });
            }
        });
    };

    confirmDeletePrompt = () => {
        let answer = window.confirm("Are you sure you want to delete your Salon account?")
        if (answer) {
            this.deleteUser()
        };

    }

    render() {

        if(this.state.redirect) {
            return <Redirect to="/signup" />
        };

        return (

                <h2 className="delete-profile-icon"
                    onClick={this.confirmDeletePrompt}
                >
                    <FontAwesomeIcon icon={faUserTimes} />
                </h2>

        );

    }

}

export default DeleteUserButton