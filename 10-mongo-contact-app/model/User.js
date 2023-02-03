const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: {
    required: true,
    type: String,
  },
  email: String,
  phone: String,
});

module.exports = User;
