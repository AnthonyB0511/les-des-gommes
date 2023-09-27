const router = require("express").Router();

const connection = require("../../database");


router.post("/register", (req, res) => {
    const { name, firstname, username, email, password, age } = req.body;
    console.log(req.body)
    const sql = `SELECT * FROM user WHERE email="${email}"`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length) {
            let isEmail = { message: "Cet e-mail est déjà utilisé pour ce site" };
            res.send(isEmail)
        } else {
            const sqlInsert = "INSERT INTO user (name,firstname,username, email, password,age)VALUES(?,?,?,?,?,?)";
            const values = [name, firstname, username, email, password, age];
            connection.query(sqlInsert, values, (err, result) => {
                if (err) throw err;
                let resultBack = req.body;
                resultBack.id = result.insertId;
                let isEmail = { messageGood: "Inscription réussie ! Vous allez être rediriger" }
                res.send(isEmail)
            })
        }
    })
})

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT idUser, username, email FROM user WHERE email="${email}" AND password="${password}"`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        if (!result.length) {
            let wrong = { message: "La combinaison email/mot de passe ne correspond à aucun compte" };
            res.send(wrong)
        } else {
            let idUser = result[0].idUser;
            const sqlData = `SELECT user.username, user.name,user.firstname,user.age,user.email 
        FROM user
        WHERE  user.idUser = ${idUser}`;
            connection.query(sqlData, (err, result) => {
                if (err) throw err;
                console.log(result)
                res.send(JSON.stringify(result))
            })
        }
    })
})
module.exports = router;