const express = require('express');
// bring in user controller methods
const {
    getAllUsers,
    getUserByUsername,
    getSingleUser,
    updateUserProfile,
    deleteUser,
    getProfileImage
    // getUserById,
} = require('../controllers/user-controller');
// bring in validator from validator/index.js
const { restrictedRouteAccess } = require('../controllers/authentication-controller');
// use express router
const router = express.Router();

// hand over to controller (use express.method(URL, middleware, run function))
router.get("/users", getAllUsers);
router.get("/user/image/:username", getProfileImage); 
router.get("/user/:username", restrictedRouteAccess, getSingleUser);
router.put("/user/:username", restrictedRouteAccess, updateUserProfile);
router.delete("/user/:username", restrictedRouteAccess, deleteUser);

// if these params are in the routes above, the following methods will fire
// (make query to database and get user information for any route containing :username)
router.param("username", getUserByUsername);

module.exports = router;

