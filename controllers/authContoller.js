/* export each function by attaching the module.exports*/

/* respond to the routes in authRoutes */
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = (req, res) => {
  /* create new user in db */
  res.send("user signup");
};

module.exports.login_post = (req, res) => {
  /* authenticate user */
  res.send("user login");
};
