const User = require("../models/User");

/* export each function by attaching the module.exports*/

/* respond to the routes in authRoutes */
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  /* take user data */
  const { email, password } = req.body;

  /* create new user in db */
  try {
    /* create an instance of the model and create in db */
    const user = await User.create({ email, password });
    res
      .status(201)
      .json(user); /* send the new user from db which contains id ... */
  } catch (error) {
    console.log(error);
    res.status(400).send("error user not created");
  }
};

module.exports.login_post = async (req, res) => {
  /* take user data */
  const { email, password } = req.body;
  res.send("user login");
};
