const User = require("../models/User");
const jwt = require("jsonwebtoken");
/* export each function by attaching the module.exports*/

/* handle Errors */
const handleErrors = (err) => {
  console.log(err.message, err.code); //err.code is for unique email
  let errors = { email: "", password: "" };

  /* incorrect email/password error :login */
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }
  if (err.message === "incorrect password") {
    errors.password = "that password is not registered";
  }
  /*  duplicate error code */
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  //validatin errors
  if (err.message.includes("user validation failed")) {
    /*the err contains errors object with all the info */
    console.log(Object.values(err.errors));

    Object.values(err.errors).forEach((erro) => {
      /* update the email and pass above to these errors  */
      errors[erro.properties.path] = erro.properties.message;
    });
  }
  return errors;
};

/* Create a JWT Token */
const maxAge = 3 * 24 * 60 * 60; //time in sec
const createToken = (id) => {
  return jwt.sign({ id }, "type is a secret text that will be saved", {
    expiresIn: maxAge,
  });
};

/* respond to the routes in authRoutes */
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  /* take user data : becoz of express.json in app.js*/
  const { email, password } = req.body;

  /* create new user in db */
  try {
    /* create an instance of the model and create in db */
    const user = await User.create({ email, password });
    //now after saving lets give it a token
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(
      error
    ); /* the arg here is the errors from the Schema : this function will now continue */
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  /* take user data */
  const { email, password } = req.body;

  try {
    /* take user from the model and login */
    const user = await User.login(email, password);
    /* create token to identify user in future requests */
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  /* replace the jwt with blank:delete */
  res.cookie("jwt", " ", { maxAge: 1 });
  res.redirect("/");
};
