const router = require("express").Router();

const connection = require("../../database");


router.post("/register", (req, res) => {
    const { name, firstname, username, email, password, age } = req.body;
    const sql = `SELECT * FROM user WHERE email="${email}"`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length) {
            let isEmail = { message: "Cet e-mail est déjà utilisé pour ce site" };
            res.send(isEmail);
        } else {
            const sqlInsert = "INSERT INTO user (name,firstname,username, email, password,age)VALUES(?,?,?,?,?,?)";
            const values = [name, firstname, username, email, password, age];
            connection.query(sqlInsert, values, (err, result) => {
                if (err) throw err;
                let resultBack = req.body;
                resultBack.id = result.insertId;
                let isEmail = { messageGood: "Inscription réussie ! Vous allez être rediriger" };
                res.send(isEmail);
            });
        }
    });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT idUser, username, email FROM user WHERE email="${email}" AND password="${password}"`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        if (!result.length) {
            let wrong = { message: "La combinaison email/mot de passe ne correspond à aucun compte" };
            res.send(wrong);
        } else {
            let idUser = result[0].idUser;
            const sqlData = `SELECT *
        FROM user
        WHERE  user.idUser = ${idUser}`;
            connection.query(sqlData, (err, result) => {
                if (err) throw err;
                res.send(JSON.stringify(result));
            });
        }
    });
});
router.patch("/modifyUser", (req, res) => {
    const { email, idUser } = req.body;
    console.log(req.body);
    const sql = `SELECT idUser, username, email FROM user WHERE email="${email}" AND idUser !="${idUser}"`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length) {
            let wrong = { message: "Cette adresse email est déjà utilisée" };
            res.send(wrong);
        } else {
            const { email, username, password, idUser } = req.body;
            console.log(req.body);
            const sqlUpdate = `UPDATE user SET email="${email}", username="${username}", password="${password}" WHERE idUser="${idUser}"`;
            connection.query(sqlUpdate, (err, result) => {
                if (err) throw err;
                let modificationOk = { messageGood: "Vos modifications ont bien été prises en compte" };
                res.send(modificationOk);
            });
        }
    });
});

module.exports = router;