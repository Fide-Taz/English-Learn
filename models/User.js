/* we will use this when interacting with the db */

const mongoose = require("mongoose");
const { isEmail } = require("validator"); /* email validator packg */
const bcrypt = require("bcrypt");

/* schema : properties */

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true /* turn the user value to lower case  */,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "minimal length should be 6"],
  },
  /* all the erros will be caught in the controller when we fail to create a new user   */
});

//fire a function to hash the password before doc saved in db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
