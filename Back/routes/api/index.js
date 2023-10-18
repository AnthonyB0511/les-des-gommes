const router = require("express").Router();

const apiUsers = require("./users");
const apiProfile = require("./profile");
const apiGenre = require("./genre");
const apiGames = require("./games");


router.use('/users', apiUsers);
router.use('/profile', apiProfile);
router.use('/genre', apiGenre);
router.use('/games', apiGames);


module.exports = router;