const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favourites: [
    {
      name: {
        type: String,
        required: true,
      },
      genre: {
        type: String,
        required: true
      }
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
