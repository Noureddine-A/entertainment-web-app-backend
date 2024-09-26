const fetch = require("node-fetch");

const User = require('../models/user');
require("dotenv").config();

exports.getTrendingMovies = (req, res, next) => {
  let trendingList = [];

  fetch("https://api.themoviedb.org/3/movie/now_playing", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.TMDB_API_KEY,
    },
  })
    .then((response) => {
      response
        .json()
        .then((r) => {
          const slicedMovieList = r.results.slice(0, 4);

          let slicedMovieListWithGenre = addGenre(slicedMovieList, "Movie");
          trendingList = appendList(slicedMovieListWithGenre);
        })
        .then(
          fetch("https://api.themoviedb.org/3/tv/top_rated", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + process.env.TMDB_API_KEY,
            },
          }).then((response) => {
            response.json().then((r) => {
              const slicedTvShowList = r.results.slice(0, 4);

              let slicedTVShowListWithGenre = addGenre(
                slicedTvShowList,
                "TV Series"
              );

              let trendingTvShows = appendList(slicedTVShowListWithGenre);

              let result = trendingList.concat(trendingTvShows);

              return res.status(200).json({ result });
            });
          })
        );
    })
    .catch((error) => {
      next(error);
    });
};

exports.getRecommendations = (req, res, next) => {
  let recommendedList = [];

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
        .then((recommendedMovies) => {
          const slicedRecommendedMovies = recommendedMovies.results.slice(
            0,
            12
          );
          const slicedRecommendedMoviesWithGenre = addGenre(
            slicedRecommendedMovies,
            "Movie"
          );
          recommendedList = appendList(slicedRecommendedMoviesWithGenre);
        })
        .then(
          fetch("https://api.themoviedb.org/3/tv/popular", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + process.env.TMDB_API_KEY,
            },
          }).then((response) => {
            response.json().then((recommendedTvSeries) => {
              const sliced = recommendedTvSeries.results.slice(0, 12);
              const slicedWithGenre = addGenre(sliced, "TV Series");
              recommendedList = recommendedList.concat(slicedWithGenre);
              const result = recommendedList;

              return res.status(200).json({ result });
            });
          })
        );
    })
    .catch((error) => {
      next(error);
    });
};

exports.getMovies = (req, res, next) => {
  fetch("https://api.themoviedb.org/3/movie/popular", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.TMDB_API_KEY,
    },
  })
    .then((response) => {
      response.json().then((result) => {
        return res.status(200).json({ result });
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getTVSeries = (req, res, next) => {
  fetch("https://api.themoviedb.org/3/tv/popular", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.TMDB_API_KEY,
    },
  })
    .then((response) => {
      response.json().then((result) => {
        return res.status(200).json({ result });
      });
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

function addGenre(list, genre) {
  let listWithGenre = [];
  for (let i = 0; i < list.length; i++) {
    let newObj = { ...list[i], genre: genre };
    listWithGenre.push(newObj);
  }

  return listWithGenre;
}

function checkBookmark(list) {
 // TODO: Check whether the content exists in the favourites list of the user
}
