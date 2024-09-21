const fetch = require("node-fetch");
require("dotenv").config();

exports.getTrendingMovies = (req, res, next) => {
  let trendingList = [];

  fetch("https://api.themoviedb.org/3/movie/popular", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.TMDB_API_KEY,
    },
  })
    .then((response) => {
      response
        .json()
        .then((result) => {
          const slicedMovieList = result.results.slice(0, 4);
          trendingList = appendList(slicedMovieList);
        })
        .then(
          fetch("https://api.themoviedb.org/3/tv/popular", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + process.env.TMDB_API_KEY,
            },
          }).then((response) => {
            response.json().then((result) => {
              const slicedTvShowList = result.results.slice(0, 4);
              let trendingTvShows = appendList(slicedTvShowList);

              let trending = trendingList.concat(trendingTvShows);

              return res.status(200).json({ trending });
            });
          })
        );
    })
    .catch((error) => {
      next(error);
    });
};

function appendList(list) {
  let resultList = [];
  for (let i = 0; i < list.length; i++) {
    resultList.push(list[i]);
  }

  return resultList;
}
