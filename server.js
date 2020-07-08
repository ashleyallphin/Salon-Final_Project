<<<<<<< HEAD
// require dependencies
var express = require('express');
const path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
const mongoose = require('mongoose');
var PORT = process.env.PORT || 5000
// invoke config method for dotenv
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
	);

// use mongoose to connect to the Mongo database
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-ge9yd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose
	.connect(
		mongoURI,
		{ useNewUrlParser: true, useUnifiedTopology: true } 
	)
	.then(() => console.log(`Successfully connected to MongoDB.` + 
	`\n-----------------------------------------------------`))
	.catch(err => console.log(err))

// set static directory to build folder
app.use(express.static(path.join(__dirname, 'client/build')));

// use routes from /routes
var Users = require('./routes/Users')
var Projects = require('./routes/Projects')
app.use('/users', Users)
app.use('/', Projects)

// listen on the port
app.listen(PORT, () => {
    console.log(`\nApp listening on http://localhost:${PORT}`);
=======
// VARIABLES
// ================================================
const color = require('colors-cli/toxic');
const express = require ('express');
const bodyParser = require ('body-parser');
const cookieParser = require ('cookie-parser');
const morgan = require ("morgan");
const mongoose = require("mongoose");
    //to circumvent deprecation warnings
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useCreateIndex', true);
const expressValidator = require ('express-validator');
const dotenv = require ('dotenv');
dotenv.config();

// invoke express
const app = express();
// bring in routes
const authRoutes = require("./routes/authentication-route");
const userRoutes = require("./routes/user-route");
const postRoutes = require("./routes/post-route");


// DATABASE
// ================================================
var db = process.env.MONGODB_URI

mongoose.connect(db)
.then(() => console.log(`Successfully connected to MongoDB.`.x206 + 
`\n+++++++++++++++++++++++++++++++++++++++++\n`.x255))
mongoose.connection.on('error', err =>
console.log(`Error connectiong to MongoDB: ${err.message}`.x196));


// MIDDLEWARE
// ================================================
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(postRoutes);
app.use(userRoutes);
app.use(authRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
    res.status(401).json('Authorization error: Please log in to Salon to access this content.');
    }
    });


// LISTEN
// ================================================
var PORT = 8080
app.listen(PORT, () => {
    console.log(`\nApp listening on `.x81 + `http://localhost:${PORT}`.x226.underline);
>>>>>>> repo-2/master
});