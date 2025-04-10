const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Please enter a valid Gmail address']
  }
});


// Adds username, hash, salt, and helper methods (authenticate, register, etc.)
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
