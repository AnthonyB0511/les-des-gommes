const router = require("express").Router();
const connection = require("../../database/index");

router.post("/addGame", (req, res) => {
    console.log(req.body);
});


module.exports = router;