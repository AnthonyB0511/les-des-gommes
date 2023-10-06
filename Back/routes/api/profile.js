//  utilise les routes avec express et se connecte à la BDD
const router = require("express").Router();
const connection = require("../../database/index");


// à l'inscription l'utilisateur a une image par défaut
router.get("/getDefaultImage", (req, res) => {
    const sql = "SELECT blobby FROM image LIMIT 1";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});

//insérer une image
router.patch("/insertImage", (req, res) => {
    console.log(req.body);
    const idUser = req.body.idUser;
    const blobby = req.body.value;
    const updateSQL = "UPDATE user SET blobby = ? WHERE idUser = ?";
    connection.query(updateSQL, [blobby, idUser], (err, result) => {
        if (err) throw err;
    });
    // sélectionner l'image qui vient d'être envoyée
    const searchSQL = "SELECT blobby FROM user WHERE idUser = ?";
    connection.query(searchSQL, [idUser], (err, result) => {
        if (err) throw err;
        console.log(result[0]);
        res.send(result[0]);
    });
});

// récupère l'image au log
router.get("/getAvatarFromUser", (req, res) => {
    const id = req.query.id;
    const sql = "SELECT blobby FROM user WHERE idUser = ?";
    connection.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});

// export du module
module.exports = router;