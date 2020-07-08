const color = require('colors-cli/toxic');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookieParser = require ('cookie-parser');
const User = require ("../models/user-model");
const expressJwt = require('express-jwt');

// method to sign up a new user
exports.signUp = async (req, res) => {
    // if there's an error, return the message that the email address is taken
    const emailExists = await User.findOne({ email: req.body.email})
    const usernameExists = await User.findOne({ username: req.body.username})

    if (emailExists) return res.status(403).json({ 
        error: "This email address is assigned to an existing user."
    })
    if (usernameExists) return res.status(403).json({
        error: "A fellow artist is already using this username."
    })
    //if no error, create user
    const user = await new User (req.body)
    await user.save()
        res.status(200).json({ message: "You've joined Salon! Please log in to your account to continue."})
};

exports.logIn = (req, res) => {
    // find the user based on the username
        const { username, password } = req.body
    // if error, user is not found
        User.findOne({ username }, (err, user) => {
        // handle errors
            // if username is not found
            if (err || !user) {
                return res.status(401).json({
                    error: "Username not found."
                })
            }
            // if user is found, but username and password combo do not match
            if(!user.authenticateLogInCredentials(password)) {
                return res.status(401).json({
                error: "Invalid username and password."
            })
        }
        // generate a token with userID and jwt secret
            // create token using cookie-parser and JWT_SECRET
            const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, {expiresIn: '12h'});
            // add the token in the cookie with expiry date
            res.cookie("token", token)
            // return response with user and token to front end
            const { _id, username, firstName, lastName, email } = user;
            // return response to front end
            return res.json(
                {
                    message: "Log in successful.",
                    token,
                    user:
                        { _id, username, firstName, lastName, password, email
                        }
                });
    });
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Logout successful.' });
};

// protect routes -- routes can only be accessed by signed in users
// https://www.oreilly.com/library/view/full-stack-react-projects/9781788835534/f7b06b77-b976-4b1e-8167-1d7328c8e080.xhtml
exports.restrictedRouteAccess = expressJwt({
    // if the token is valid, express-jwt appends the verified user's id in an auth key to request object
    secret: process.env.JWT_SECRET, 
    userProperty: "auth",
    algorithms: ['HS256']
});

