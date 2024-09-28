const User = require("../models/user");
require("dotenv").config();

exports.saveBookmark = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      if (user) {
        user.favourites.push({
          name: req.body.title,
          genre: req.body.genre,
          posterPath: req.body.posterPath,
          releaseYear: req.body.releaseYear,
        });
        user.save().then((result) => {
          res
            .status(200)
            .json({ message: "Content has been succesfully bookmarked." });
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteBookmark = (req, res, next) => {
  User.findById(req.userId).then((user) => {
    if (user) {
      let updatedList = user.favourites.filter((item) => {
        return item.name !== req.body.title;
      });

      user.favourites = updatedList;

      user.save().then((r) => {
        res
          .status(200)
          .json({ message: "Successfully removed bookmark item." });
      });
    }
  });
};

exports.getBookmarks = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      if (user) {
        const result = user.favourites;
        res.status(200).json({ result });
      }
    })
    .catch((error) => {
      next(error);
    });
};
