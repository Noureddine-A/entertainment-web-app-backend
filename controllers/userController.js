const User = require("../models/user");

exports.saveBookmark = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      if (user) {
        user.favourites.push({ name: req.body.title, genre: req.body.genre });
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

exports.getBookmarks = (req, res, next) => {
  User.findById(req.userId).then((user) => {
    if (user) {
      const bookmarks = user.favourites;
      let result = [];

      for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].genre === "movie") {
          fetch(
            "https://api.themoviedb.org/3/search/movie?query=" +
              bookmarks[i].title
          ).then((r) => {
            return result.push({ ...r, genre: "Movie" });
          });
        }

        fetch(
          "https://api.themoviedb.org/3/search/tv?query=" + bookmarks[i].title
        ).then((r) => {
          return result.push({ ...r, genre: "TV Series" });
        });
      }

      res.status(200).json({ result });
    }
  });
};
