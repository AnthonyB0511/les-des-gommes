const router = require("express").Router();
const connection = require("../../database/index");

router.post("/addGame", (req, res) => {
    try {
        const searchSql = "SELECT * FROM game WHERE nameGame=?";
        const nameGame = req.body.nameGame;
        connection.query(searchSql, [nameGame], (err, result) => {
            if (err) throw err;
            if (!result.length) {
                const { author, photo, year, editor, genre } = req.body;
                const addSql = "INSERT INTO game (nameGame, author, photo, year,editor,idGenre) VALUES(?,?,?,?,?,?)";
                const values = [nameGame, author, photo, year, editor, genre];
                connection.query(addSql, values, (err, result) => {
                    if (err) throw err;
                    res.status(200).json("Le jeu a bien été ajouté");
                });
            } else {
                console.log("il n'est pas passé");
                res.status(400).json("Le jeu est déjà dans la base de données.");
            }
        });
    } catch (error) {
        res.status(400).json("Un problème est survenu...");
    }
});

router.delete("/deleteGameData/:id", (req, res) => {
    try {
        console.log(req.params);
        const idGame = req.params.id;
        const deleteGameSql = "DELETE FROM game WHERE idGame = ?";
        connection.query(deleteGameSql, [idGame], (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    } catch (error) {
        res.sendStatus(400).json("Un problème est survenu...");
    }
});

router.get("/getGames", (req, res) => {
    try {
        const selectSql = "SELECT * FROM game";
        connection.query(selectSql, (err, result) => {
            if (err) throw err;
            res.send(JSON.stringify(result));
        });
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;