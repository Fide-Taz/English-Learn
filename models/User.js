/* we will use this when interacting with the db */

const mongoose = require("mongoose");

/* schema : properties */

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true /* turn the user value to lower case  */,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
