const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const authController = require("../controllers/authController");

router.post(
  "/signup",
  check(["username", "password", "repeatPassword"])
    .notEmpty()
    .withMessage("Can't be empty."),
  check("repeatPassword", "password")
    .custom((value, { req }) => {
      if (value === req.body.password) {
        return true;
      }
      return false;
    })
    .withMessage("Passwords don't match."),
  authController.signUpUser
);

module.exports = router;
