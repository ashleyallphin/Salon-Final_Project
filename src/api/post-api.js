const color = require('colors-cli/toxic');
// router.get('/posts', restrictedRouteAccess, getPosts);
// router.get("/posts/by/:username", restrictedRouteAccess, postsByUser);
// router.delete("/post/:postId", restrictedRouteAccess, isArtist, deletePost);
// router.post('/post/new/:username', restrictedRouteAccess, createPost, createPostValidator)
// router.param("username", getUserByUsername);
// router.param("postId", postsById);

export const uploadProject = (username, token, post) => {
    return fetch(`/post/new/${username}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json();
        })
        .catch (err => console.log(err))
};

export const listProjects = () => {
    return fetch(`/posts`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listOneProject = (postId) => {
    console.log(`\nhitting listOneProject from post-api.js\n`.x205);
    return fetch(`/post/${postId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listProjectsByUser = (username, token) => {
    console.log(`\nhitting listProjectsByUser method from post-api.js\n`.x205);
    return fetch(`/posts/by/${username}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const postFeedback = (userId, username, token, postId, comment) => {
    console.log(`\nhitting postFeedback method from post-api.js\n`.x205);
    return fetch(`/project/comment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, username, postId, comment })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteFeedback = (userId, username, token, postId, comment) => {
    console.log(`\nhitting deleteFeedback method from post-api.js\n`.x205);
    return fetch(`/project/uncomment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId, username, comment })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
