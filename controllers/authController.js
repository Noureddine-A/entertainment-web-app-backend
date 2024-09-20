const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.signUpUser = (req, res, next) => {
  const result = validationResult(req);

  let error = [];

  if (result.errors.length > 0) {
    for (let i = 0; i < result.errors.length; i++) {
      error.push({
        value: result.errors[i].path,
        message: result.errors[i].msg,
      });
    }
    return res.status(422).json({ error });
  }

  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          User.insertMany({ username: req.body.username, password: hash }).then(
            (result) => {
              res
                .status(200)
                .json({ message: "User has been successfully created." });
            }
          );
        });
      } else {
        error.push({ value: "username", message: "User already exists." });
        res.status(422).json({error});
      }
    })
    .catch((error) => {
      next(error);
    });
};
