import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../api/authentication-api';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            // checks to see if the uesr is signed in
            isAuthenticated() ? (
                // if user is signed in, show component
                <Component {...props} />
            ) : (
                // if user is not signed in, redirect to log in page
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;