const User = require("../models/User");

/* export each function by attaching the module.exports*/

/* handle Errors */
const handleErrors = (err) => {
  console.log(err.message, err.code); //err.code is for unique email
  let errors = { email: "", password: "" };

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
    res
      .status(201)
      .json(user); /* send the new user from db which contains id ... */
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
  res.send("user login");
};
