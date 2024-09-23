const express = require('express');

const router = express.Router();
const entertainmentController = require('../controllers/entertainmentController');

router.get('/trending', entertainmentController.getTrendingMovies);
router.get('/recommendation', entertainmentController.getRecommendations);

module.exports = router;