const express = require('express');
// bring in POST controller methods
const
    {
    createPost,
    getPosts,
    getOnePost,
    postsByUser,
    postsById,
    isArtist,
    updatePost,
    deletePost,
    getProjectImage,
    leaveFeedback,
    removeFeedback
    // updateComment
    } = require('../controllers/post-controller');
// bring in any USER controller methods
const { getUserById, getUserByUsername } = require('../controllers/user-controller');
// bring in any VALIDATOR mehods
const { createPostValidator } = require ('../validator');

// ***************************************
// const { restrictedRouteAccess } = require('../controllers/authentication-controller');

// use express router
const router = express.Router();

// HAND ROUTES OVER TO CONTROLLER
// ***************************************
// disabled restrictedRouteAccess
router.get('/posts', getPosts);
router.get('/post/:postId', getOnePost);
router.get("/posts/by/:username", postsByUser);
router.get("/post/image/:postId", getProjectImage); 
router.post('/post/new/:username', createPost, createPostValidator)
router.put('/post/:postId', isArtist, updatePost);
router.delete("/post/:postId", isArtist, deletePost);


// comments
router.put('/project/comment', leaveFeedback);
router.put('/project/uncomment', removeFeedback);
// router.put('/post/updatecomment', updateComment);

// make query to database and get user information for any route containing :username
router.param("username", getUserByUsername);
router.param("userId", getUserById);
// make query to database and get user information for any route containing :postId
router.param("postId", postsById);


module.exports = router;

