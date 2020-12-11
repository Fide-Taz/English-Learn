/* check if there is jwt on the request  */
const jwt = require("jsonwebtoken");

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

module.exports = { requireAuth };
