const color = require('colors-cli/toxic');
const Post = require ('../models/post-model');
const formidable = require ('formidable');
const fs = require ('fs');
const _ = require ('lodash');

exports.postsById = (req, res, next, id) => {
    console.log(`\npostsById method from post-controller because of the postId in the URL`.x211)
    Post.findById(id)
    // get the comments and who posted the comment from these populate methods
    .populate("comments", "text created")
    .populate("comments.postedBy", "_id username")
    .populate("postedBy", "_id username")
    .exec((err, post) => {
        if (err || !post) {
            return res.status(400).json({
                error: err
            });
        }
        req.post = post;
        console.log("moved through postsById method in post-controller", post);
        next();
    });
};

exports.getPosts = (req, res) => {
    console.log(`\ngetPosts method from post-controller`.x211)
    // get posts from database
    const posts = Post.find()
    // get the comments and who posted the comment from these populate methods
    .populate("comments", "text created")
    .populate("comments.postedBy", "_id username")
    .populate("postedBy", "_id username")
    // this select method is optional -- if left out, ALL of the values will be returned
    .sort ({ posted: -1 })
    .select("_id body title projectMedium projectCategory projectTags projectYear projectLink projectStatus posted")
    .then(posts => {
        // status 200 is default, so we can leave it out in the future
        // when key and value are the same, we can leave it as one word ('posts')
        res.status(200).json (posts);
    })
    console.log(`\n\nPOST FORM DATA: `.x117, posts)
    .catch(err => console.log(err))
};

// method to create a post
exports.createPost = (req, res, next) => {
    console.log(`\n\ncreatePost method from post-controller`.x211)
    // method from formidable package
    let form = new formidable.IncomingForm();
    // keep extensions of the images
    form.keepExtensions = true;
    // parse the request
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "There was an error uploading your image."
            });
        }
        // create a post based on all the fields coming from the req
        let post = new Post(fields);
        // from the post model, which is connected to the post to the user
        post.postedBy = req.profile;
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        // handle files
        if(files.projectImage) {
            post.projectImage.data = fs.readFileSync(files.projectImage.path);
            post.projectImage.contentType = files.projectImage.type;
        };
        post.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
            }
            res.json(result);
        });
    });
};

exports.postsByUser = (req, res) => {
    console.log(`\n\nhitting postsByUser method from post-controller`.x211)
    Post.find({postedBy: req.profile._id})
    // use .populate from a different model (rather than select)
    .populate("postedBy", "_id username email")
    .sort("posted")
    .exec((err, posts) => {
        if (err) {
            console.log(`getting posts by user`.x204)
            return res.status(400).json({
                error: err
            })
        }
        res.json(posts);
        console.log("GET POSTS BY USER from post-controller postsByUserMethod", posts)
    });
};

exports.isArtist = (req, res, next) => {
    console.log(`\n\isArtist method from post-controller`.x211)
    let isArtist = req.post && req.auth && req.post.postedBy._id === req.auth._id
    if (!isArtist) {
        return res.status(403).json({
            error: "User is not authorized to perform this action."
        });
    }
    next();
};

exports.updatePost = (req, res, next) => {
    console.log(`\n\nupdatePost method from post-controller`.x211)
    let post = req.post
    post= _.extend(post, req.body)
    post.updated = Date.now()
    post.save(err => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(post);
    });
};

exports.deletePost = (req, res) => {
    console.log(`\n\ndeletePost method from post-controller`.x211)
    let post = req.post
    post.remove((err, post) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json ({
            message: "Post deleted successfully."
        });
    });
};

exports.getProjectImage = (req, res, next) => {
    console.log(`\n\ngetProjectImage method from post-controller`.x211)
    res.set('Content-Type', req.post.projectImage.contentType);
    return res.send(req.post.projectImage.data);
};

exports.getOnePost = (req, res) => {
    return res.json(req.post);
};

exports.leaveFeedback = (req, res) => {
    console.log(`\n\nhitting leaveFeedback method from post-controller`.x211)
    let comment = req.body.comment;
    comment.postedBy = req.body.userId
    // https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
    Post.findByIdAndUpdate (
        req.body.postId,
        { $push: { comments: comment } },
        { new: true },
    )
    .populate ('comments.postedBy', '_id username email')
    .populate ('postedBy', "_id username email")
    .exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        } else {
            res.json(result);
            console.log(`moved through leaveFeedback method from post-controller!`.x161);
        }
    });
}

exports.removeFeedback = (req, res) => {
    console.log(`\n\nhitting removeFeedback method from post-controller`.x211)
    let comment = req.body.comment;
    // https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
    Post.findByIdAndUpdate (
        req.body.postId,
        { $pull: { comments: { _id:comment._id} } },
        { new: true },
    )
    .populate ('comments.postedBy', '_id username email')
    .populate ('postedBy', "_id username email")
    .exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        } else {
            res.json(result);
            console.log(`moved through removeFeedback method from post-controller!`.x161);
        }
    });
}