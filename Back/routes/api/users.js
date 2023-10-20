const router = require("express").Router();
const connection = require("../../database");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../keys/index");

router.post("/register", async (req, res) => {
    const { name, firstname, username, email, password } = req.body;
    const sql = `SELECT * FROM user WHERE email=?`;
    connection.query(sql, [email], async (err, result) => {
        try {
            if (result.length === 0) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const insertSql = "INSERT INTO user(name,firstname,username, email, password) VALUES(?,?,?,?,?)";
                const values = [name, firstname, username, email, hashedPassword];
                connection.query(insertSql, values, (err, result) => {
                    if (err) throw err;
                    res.status(200).json("Félicitation, votre inscription est validée");
                });
            } else {
                res.status(400).json("Cet email est déjà utilisé pour ce site");
            }
        } catch {
            res.status(400).json("Un problème est survenu...");
        }
    });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM user WHERE email=?`;
    connection.query(sql, [email], async (err, result) => {
        try {
            if (result.length > 0) {
                if (bcrypt.compareSync(password, result[0].password)) {
                    const token = jsonwebtoken.sign({}, key, {
                        subject: result[0].idUser.toString(),
                        expiresIn: 3600 * 24,
                        algorithm: "RS256"
                    });
                    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });
                    console.log(res.cookie);
                    res.json(result[0]);
                    console.log("token : " + token);
                } else {
                    res.status(400).json("Email et/ou mot de passe incorrect");
                }
            } else {
                res.status(400).json("Email et/ou mot de passe incorrect");
            }
        } catch (error) {
            console.log(error);
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
                    const passwordMatch = await bcrypt.compare(oldPassword, dbPassword);
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

router.get('/userConnected', (req, res) => {
    const { token } = req.cookies;
    console.log(req.cookies);
    if (token) {
        try {
            const decodedToken = jsonwebtoken.verify(token, keyPub, {
                algorithms: "RS256",
            });
            const sql = "SELECT username, idUser,firstname, name,password, email,blobby FROM user WHERE idUser = ?";
            connection.query(sql, [decodedToken.sub], (err, result) => {
                if (err) throw err;
                const connectedUser = result[0];
                connectedUser.password = "";
                if (connectedUser) {
                    res.json(connectedUser);
                } else {
                    res.json(null);
                }
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        res.json(null);
    }
});

router.delete('/logout', (req, res) => {
    console.log("Déconnexion en cours");
    res.clearCookie('token');
    res.end();
});

module.exports = router;