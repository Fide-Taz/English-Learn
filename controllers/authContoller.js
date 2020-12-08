/* export each function by attaching the module.exports*/

/* respond to the routes in authRoutes */
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = (req, res) => {
  /* take user data */
  const { email, password } = req.body;
  /* create new user in db */
  res.send("user signup");
};

module.exports.login_post = (req, res) => {
  /* take user data */
  const { email, password } = req.body;
  res.send("user login");
};
