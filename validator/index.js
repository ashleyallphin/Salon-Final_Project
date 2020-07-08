exports.createPostValidator = (req, res, next) => {
    // title is required
    req.check('title', "Please declare a title. If you have not named your project, you may input 'Untitled.'").notEmpty();
    req.check('title', "Title input is limited to 100 characters.").isLength({
        min: 1,
        max: 100
    });
    // description max is 300 characters
    req.check('body', "Please keep your description fewer than 300 characters or fewer.").isLength({
        min: 0,
        max: 300
    });
    // check for errors
    const errors = req.validationErrors()
    // if error, resond first error so 
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError});
    }
    // let the operation run to the next middleware so won't halt application -- proceed to next middleware
    next();
};

exports.userSignUpValidator = (req, res, next) => {
// FIRST NAME VALIDATIONS ----------------------------------------------------------
    // not empty
    console.log(req.body)
    req.check('firstName', "First name is required.").notEmpty();
    // allows alphanumeric, hyphens, spaces
    // req.check('firstName', "First name contains invalid character.").matches();
    // no two hyphens or spaces in row
    // req.check('firstName', "First name contains invalid input.").matches();
    // must not begin with hyphen
    // req.check('firstName', "First name must not begin or end with a hyphen.").matches();
    // length is between 2 and twenty characters
    req.check('firstName', "Please enter a first name between 2 and 20 characters.").isLength({
        min: 2,
        max: 20
    });

// LAST NAME VALIDATIONS ----------------------------------------------------------
    // not empty
    req.check('lastName', "Last name is required.").notEmpty();
    // allows alphanumeric, hyphens, spaces
    // req.check('lastName', "Last name contains invalid character.").matches();
    // no two hyphens or spaces in row
    // req.check('lastName', "Last name contains invalid input.").matches(;
    // must not begin with hyphen
    // req.check('lastName', "Last name must not begin or end with a hyphen.").matches();
    // length is between 2 and twenty characters
    req.check('lastName', "Please enter a last name between 2 and 20 characters.").isLength({
        min: 2,
        max: 20
    });

// USERNAME VALIDATIONS ----------------------------------------------------------
    // not empty
    req.check('username', "Username is required.").notEmpty();
    // between 5 and 20 characters
    req.check('username', "Your username must be between 5 and 20 characters.").isLength({
        min: 5,
        max: 20
    });
    // allowed characters
    // req.check('username', "Username contains invalid character. Please use only alphanumeric characters and underscores in your username.").matches();
    //username cannot begin with an underscore
    // req.check('username', "Usernames cannot begin with a number or underscore. Please choose a username that begins with an alpha character.").matches();

// EMAIL VALIDATIONS ----------------------------------------------------------
    // email is not null, valid address
    req.check('email', "A valid email address is required.").notEmpty();
    req.check('email', "Please enter a valid email address.").isEmail();

// PASSWORD VALIDATIONS ----------------------------------------------------------
    // check for password
    req.check('password', "Password is required.").notEmpty();
    // password must be between 6 and fifteen chracters, 
    req.check('password', "Your password must be between 6 and 15 characaters.").isLength({
        min: 6,
        max: 15
    });
    // allowed characters
    // req.check('password', "Password contains invalid character.").matches();

    // check for errors
    const errors = req.validationErrors()
    // if there's an error, respond with the first error's message (error.msg[0])
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError});
    }
    // let the operation run to the next middleware so won't halt application -- proceed to next middleware
    next();
};

