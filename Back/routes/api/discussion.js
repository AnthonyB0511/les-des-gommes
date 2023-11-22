const router = require("express").Router();
const connection = require("../../database/index");

router.post("/sendMessage", (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;