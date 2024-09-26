const express = require("express");

const router = express.Router();
const entertainmentController = require("../controllers/entertainmentController");

const isAuth = require("../util/is-auth");

router.get("/trending", isAuth, entertainmentController.getTrendingMovies);
router.get(
  "/recommendation",
  isAuth,
  entertainmentController.getRecommendations
);
router.get("/movie", isAuth, entertainmentController.getMovies);
router.get("/tvseries", isAuth, entertainmentController.getTVSeries);

module.exports = router;
