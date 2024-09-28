const express = require("express");

const isAuth = require("../util/is-auth");

const router = express.Router();

const userController = require("../controllers/userController");

router.post("/save", isAuth, userController.saveBookmark);
router.post("/delete", isAuth, userController.deleteBookmark);
router.get("/bookmark", isAuth, userController.getBookmarks);

module.exports = router;
