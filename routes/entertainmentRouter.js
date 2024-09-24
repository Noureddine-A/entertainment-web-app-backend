const express = require('express');

const router = express.Router();
const entertainmentController = require('../controllers/entertainmentController');

router.get('/trending', entertainmentController.getTrendingMovies);
router.get('/recommendation', entertainmentController.getRecommendations);
router.get('/movie', entertainmentController.getMovies);
router.get('/tvseries', entertainmentController.getTVSeries);

module.exports = router;