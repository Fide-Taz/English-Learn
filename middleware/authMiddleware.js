/* check if there is jwt on the request  */
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireAuth = (req, res, next) => {
  /* grap the token  */
  const token = req.cookies.jwt;

  /* check web token exist  */
  if (token) {
    /* verify the available token */
    jwt.verify(
      token,
      "type is a secret text that will be saved",
      (err, decodedToken) => {
        if (err) {
          res.redirect("/login");
        } else {
          console.log(decodedToken);
          next();
        }
      }
    );
  } else {
    res.redirect("/login");
  }
};

/* check current user if they are logged in or not so that we can answer their requests */

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    /* verify the available token */
    jwt.verify(
      token,
      "type is a secret text that will be saved",
      async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.locals.user = null;
          next();
        } else {
          console.log(decodedToken);

          let user = await User.findById(decodedToken.id);
          /* pass the properties of the user into the view by: */
          res.locals.user = user;
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
