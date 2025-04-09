const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Prevents duplicate email registrations
  },
});

// Adds username, hash, salt, and helper methods (authenticate, register, etc.)
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
