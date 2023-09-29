const router = require("express").Router();

const connection = require("../../database");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    const { name, firstname, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `SELECT * FROM user WHERE email=?`;
    connection.query(sql, [email], (err, result) => {
        if (err) throw err;
        if (result.length) {
            let isEmail = { message: "Cet e-mail est déjà utilisé pour ce site" };
            res.send(isEmail);
        } else {
            const sqlInsert = "INSERT INTO user (name,firstname,username, email, password)VALUES(?,?,?,?,?)";
            const values = [name, firstname, username, email, hashedPassword];
            connection.query(sqlInsert, values, (err, result) => {
                if (err) throw err;
                let resultBack = req.body;
                resultBack.id = result.insertId;
                req.body.password = "";
                req.body.confirmPassword = "";
                let isEmail = { messageGood: "Inscription réussie ! Vous allez être rediriger" };
                res.send(isEmail);
            });
        }
    });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT idUser, username, email,password FROM user WHERE email=?`;
    connection.query(sql, [email], async (err, result) => {
        if (err) throw err;
        if (!result.length) {
            let wrong = { message: "La combinaison email/mot de passe ne correspond à aucun compte" };
            res.send(wrong);
        } else {
            const dbPassword = result[0].password;
            const passwordMatch = await bcrypt.compare(password, dbPassword);
            if (!passwordMatch) {
                let wrong = { message: "La combinaison email/mot de passe ne correspond à aucun compte" };
                res.send(wrong);
            } else {
                let idUser = result[0].idUser;
                const sqlData = `SELECT *
        FROM user
        WHERE  user.idUser = ?`;
                connection.query(sqlData, [idUser], (err, result) => {
                    if (err) throw err;
                    res.send(JSON.stringify(result));
                });
            }
        }
    });
});

router.patch("/modifyUser", (req, res) => {
    const { username, email, idUser, oldPassword, newPassword } = req.body;
    const sql = `SELECT idUser, username, email FROM user WHERE email= ? AND idUser != ?`;
    const valuesVerifyMail = [email, idUser];
    connection.query(sql, valuesVerifyMail, (err, result) => {
        if (err) throw err;
        if (result.length) {
            let wrong = { message: "Cette adresse email est déjà utilisée" };
            res.send(wrong);
        } else {
            if (req.body.oldPassword && req.body.newPassword) {
                const sqlSelect = "SELECT * FROM user WHERE idUser = ?";
                connection.query(sqlSelect, [idUser], async (err, result) => {
                    const dbPassword = result[0].password;
                    console.log(dbPassword);
                    const passwordMatch = await bcrypt.compare(oldPassword, dbPassword);
                    console.log(passwordMatch);
                    if (!passwordMatch) {
                        let wrong = { message: "L'ancien mot de passe n'est pas correct !" };
                        res.send(wrong);
                    } else {
                        const hashedPassword = await bcrypt.hash(newPassword, 10);
                        const sqlModifyPassword = "UPDATE user SET username =?, email =?, password =? WHERE idUser =?";

                        connection.query(sqlModifyPassword, [username, email, hashedPassword, idUser], (err, result) => {
                            if (err) throw err;
                            req.body.oldPassword = "";
                            req.body.confirmPassword = "";
                            let changeOk = { messageGood: "Vos modifications ont bien été prises en compte" };
                            res.send(changeOk);
                        });
                    }
                });
            } else {
                const { email, username, idUser } = req.body;
                const sqlUpdate = `UPDATE user SET email=?, username=? WHERE idUser=?`;
                // const valuesUpdate = [email, username, idUser];
                connection.query(sqlUpdate, [email, username, idUser], (err, result) => {
                    if (err) throw err;
                    let modificationOk = { messageGood: "Vos modifications ont bien été prises en compte" };
                    res.send(modificationOk);
                });
            }
        }
    });
});

module.exports = router;