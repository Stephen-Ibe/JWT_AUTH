const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    min: 6,
    max: 255,
  },
});

module.sxports = mongoose.model("Users", userSchema);
