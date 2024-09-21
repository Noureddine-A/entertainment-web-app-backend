const express = require('express');

const router = express.Router();
const entertainmentController = require('../controllers/entertainmentController');

router.get('/trending', entertainmentController.getTrendingMovies);

module.exports = router;