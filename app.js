const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/authMiddleware");
const app = express();

// middleware
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  express.json()
); /* this will take the user input data and pass it into js object and we can now access the data in  controller : req.body */

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://fidellis:anotida2642@cluster0.cz7rv.mongodb.net/pizza";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// route
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);
