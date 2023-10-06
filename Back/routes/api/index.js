const router = require("express").Router();

const apiUsers = require("./users");
const apiProfile = require("./profile");


router.use('/users', apiUsers);
router.use('/profile', apiProfile);


module.exports = router;