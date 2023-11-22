const router = require("express").Router();

const apiUsers = require("./users");

const apiGenre = require("./genre");
const apiGames = require("./games");
const apiDiscussion = require("./discussion");


router.use('/users', apiUsers);
router.use('/genre', apiGenre);
router.use('/games', apiGames);
// router.use('/discussion', apiDiscussion);


module.exports = router;