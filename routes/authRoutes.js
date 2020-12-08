/* require route from express to use it here  */
const { Router } = require("express");

const authController = require("../controllers/authContoller");

const router = Router();

/* create the routes, for each router the action will be executed in the authController  */
router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

/* exports the routes */
module.exports = router;
