const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwtoken = require("jsonwebtoken");

const User = require("../models/user");

exports.signUpUser = (req, res, next) => {
  const result = validationResult(req);

  let error = [];

  if (result.errors.length > 0) {
    error = checkValidationResult(result.errors);
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
        res.status(422).json({ error });
      }
    })
    .catch((error) => {
      next(error);
    });
};

exports.loginUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let error = [];

  const result = validationResult(req);

  if (result.errors.length > 0) {
    error = checkValidationResult(result.errors);
    return res.status(422).json({ error });
  }

  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((isSame) => {
          if (!isSame) {
            error.push({ value: "password", message: "Incorrect password." });
            return res.status(422).json({ error });
          }

          const token = jwtoken.sign(
            { user: user },
            "asupersecretkeynoonewilleverfindout"
          );

          return res
            .status(200)
            .json({
              message: "User  successfully logged in.",
              token: token,
            });
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};

function checkValidationResult(validationResult) {
  let errorList = [];
  for (let i = 0; i < validationResult.length; i++) {
    errorList.push({
      value: validationResult[i].path,
      message: validationResult[i].msg,
    });
  }

  return errorList;
}
