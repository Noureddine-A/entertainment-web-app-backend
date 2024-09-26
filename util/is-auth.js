const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("authorization").split(" ")[1];

  const decodedToken = jwt.verify(token, "asupersecretkeynoonewilleverfindout");

  if (!decodedToken) {
    let error = new Error();
    error.statusCode = 401;
    error.message = "You're unauthorzized to perform this action.";
    throw error;
  }

  req.userId = decodedToken.user._id;

  next();
};
