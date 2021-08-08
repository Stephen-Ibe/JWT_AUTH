const mongoose = require("mongoose");
const schema = monggose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

let userSchema = new schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
  },
  {
    collection: "users",
  }
);

userSchema.plugin(uniqueValidator, { message: "Email already exists" });
module.exports = mongoose.model("User", userSchema);