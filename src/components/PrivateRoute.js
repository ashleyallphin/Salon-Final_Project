import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../api/authentication-api';

const PrivateRoute = ({ component: Component, ...rest }) => (
    // props means components passed down to this pricate route component
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
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