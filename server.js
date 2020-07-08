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
});