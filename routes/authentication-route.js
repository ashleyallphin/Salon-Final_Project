// require express
const express = require('express');
// bring in controllers
const { signUp, logIn, logout } = require('../controllers/authentication-controller');
const { getUserByUsername } = require('../controllers/user-controller');
// const { getUserByUsername } = require('../controllers/user-controller');
// bring in validator from validator/index.js
const { userSignUpValidator } = require ('../validator');
// const { restrictedRouteAccess } = require('../controllers/authentication-controller');


// use express router
const router = express.Router();

// hand over to controller
// router.get('/users', restrictedRouteAccess, getSingleUsers);

// post to backend from frontend
// before creating the post, run middleware to validate user sign up fields meet specified criteria
// sign up page
router.post('/signup', userSignUpValidator, signUp);
// log in page
router.post("/login", logIn);
//sign out page
router.get('/logout', logout);
// make query to database and get user information for any route containing :userId
router.param("username", getUserByUsername);



module.exports = router;

