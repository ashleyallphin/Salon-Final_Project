const mongoose = require('mongoose');
// npm package to generate timestamp
const uuidv1 = require ('uuidv1');
// native node.js encryption
const crypto = require('crypto');

// mongoose create schema method
const userSchema = new mongoose.Schema ({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    // use a timestamp to hash the password
    salt: String,
    created: {
            type: Date,
            default: Date.now
        },
    updated: Date,
    profileImage: {
        data: Buffer,
        contentType: String 
	},
	location: {
		type: String
	},
	bio: {
		type: String
	},
	websiteURL: {
		type: String
	},
	twitterHandle: {
		type: String
	},
	instagramHandle: {
		type: String
	},
	shopURL: {
        type: String
    }
});

// instead of storing the password input value in the database, use this virtual field to hash the input string
userSchema.virtual('password')
.set(function(password) {
    // create temp varialbe called _password -- it's equal to the user input password value
    this._password = password
    // generate a timestamp (for use in hashing the password)
    this.salt = uuidv1()
    // encrypt the password (process/function below in 'encryption process')
    this.hashed_password = this.encryptPassword(password);
    // console.log(`NEW USER\nUsername: ${this.username} \nPassword: ${password}\n`.gray);
})
.get(function () {
    return this._password
});

// userSchema methods
userSchema.methods = {
    // authenticate log in
    authenticateLogInCredentials: function(plainText) {
        // encrpt the plain text input from log in form and see if it matches the hashed_password
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    // encrypt passowrd on sign up and log in
    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        } catch (err) {
            return "";
        }
    }
}

// export module to be used in app
module.exports = mongoose.model("User", userSchema)