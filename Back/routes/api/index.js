const router = require("express").Router();

const apiUsers = require("./users");
const apiGenre = require("./genre");
const apiGames = require("./games");
const apiDiscussion = require("./discussion");
const apiArticles = require("./articles");
const apiPhotos = require("./photos");
const apiContact = require("./contact");


router.use('/users', apiUsers);
router.use('/genre', apiGenre);
router.use('/games', apiGames);
router.use('/articles', apiArticles);
router.use('/discussion', apiDiscussion);
router.use('/photos', apiPhotos);
router.use('/contact', apiContact);


module.exports = router;