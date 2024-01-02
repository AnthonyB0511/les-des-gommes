const router = require("express").Router();
const connection = require("../../database");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../keys/index");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "becque.anthony@gmail.com",
        pass: "bogl evbq rqgu rdvx"
    }
});
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, "../../uploads/avatar"));
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
});
// inscription
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    // on vérifie que l'utilisateur n'a pas réutiliser son compte
    const sql = `SELECT * FROM user WHERE email=?`;
    connection.query(sql, [email], async (err, result) => {
        try {
            if (result.length === 0) {
                // on vérifie que le nom d'utilisateur n'est pas utilisé
                const sqlUsername = "SELECT * FROM user WHERE username = ?";
                connection.query(sqlUsername, [username], async (err, result) => {
                    if (err) throw err;
                    if (result.length === 0) {
                        // hachage du password
                        const hashedPassword = await bcrypt.hash(password, 10);
                        const insertSql = "INSERT INTO user(username, email, password) VALUES(?,?,?)";
                        const values = [username, email, hashedPassword];
                        connection.query(insertSql, values, (err, result) => {
                            if (err) throw err;
                            res.status(200).json("Félicitation, votre inscription est validée");
                        });
                    } else {
                        res.status(400).json("Ce nom d'utilisateur est déjà utilisé");

                    }
                });
            } else {
                res.status(400).json("Cet email est déjà utilisé pour ce site");
            }
        } catch {
            res.status(400).json("Un problème est survenu...");
        }
    }
    );
});
// connexion
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM user WHERE email=?`;
    connection.query(sql, [email], async (err, result) => {
        try {
            if (result.length > 0) {
                // on compare  le mdp haché et celui rentré par le user et on ajoute le cookie
                if (bcrypt.compareSync(password, result[0].password)) {
                    const token = jsonwebtoken.sign({}, key, {
                        subject: result[0].idUser.toString(),
                        expiresIn: 3600 * 24,
                        algorithm: "RS256"
                    });
                    res.cookie
                        ("token", token, { maxAge: 24 * 60 * 60 * 1000 });
                    res.json(result[0]);
                } else {
                    res.status(400).json("Email et/ou mot de passe incorrect");
                }
            } else {
                res.status(400).json("Email et/ou mot de passe incorrect");
            }
        } catch (error) {
            console.error(error);
        }
    });
});

router.patch('/modifyUser', upload.single("avatar"), async (req, res) => {
    const { username, email, idUser } = req.body;
    // on vérifie que l'adresse mail  n'est pas utilisée par un autre utilisateur
    const sqlVerifyMail = `SELECT idUser, username, email FROM user WHERE email = ? AND idUser != ?`;
    const valuesVerifyMail = [email, idUser];
    let avatar = null;
    if (req.file && req.file.filename) {
        avatar = req.file.filename;
    }
    connection.query(sqlVerifyMail, valuesVerifyMail, (err, result) => {
        if (err) throw err;

        if (result.length) {
            let isEmail = { message: "Cette adresse mail est déjà utilisée" };
            if (avatar !== null) {
                // à ce moment on supprime le fichier qui vient d'être upload
                const filePath = path.join(__dirname, "../../uploads/avatar", avatar);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error("Erreur suppression d'avatar");
                    }
                });
            }
            res.send(isEmail);
            return;
        } else {
            if (avatar !== null) {
                const sqlGetAvatar = "SELECT avatar FROM user WHERE idUser = ?";
                connection.query(sqlGetAvatar, [idUser], (err, result) => {
                    if (err) throw err;
                    if (result[0].avatar !== null) {
                        // si modification d'avatar on supprie du serveur le fichier
                        const filePathAvatarDB = path.join(__dirname, "../../uploads/avatar", result[0].avatar);
                        fs.unlink(filePathAvatarDB, (err) => {
                            if (err) {
                                console.error("Erreur suppression d'avatar");
                            }

                        });
                    }
                    // on modifie tout avec l'avatar
                    const sqlUpdateWithAvatar = "UPDATE user SET username = ?, email = ?, avatar = ? WHERE idUser = ?";
                    connection.query(sqlUpdateWithAvatar, [username, email, avatar, idUser], (err, result) => {
                        if (err) throw err;
                        const sqlSelectUpdatedData = "SELECT idUser,username,email,avatar FROM user WHERE idUser = ?";
                        connection.query(sqlSelectUpdatedData, [idUser], (err, result) => {
                            if (err) throw err;

                            const updatedData = result[0];
                            const modifOk = { messageGood: "Votre profil a été mis à jour", updatedData };
                            res.send(modifOk);
                        });
                    });
                });
            } else {
                // on modifie sans l'avatar
                const sqlUpdate = "UPDATE user SET username = ?, email = ? WHERE idUser = ?";
                connection.query(sqlUpdate, [username, email, idUser], (err, result) => {
                    if (err) throw err;
                    const sqlSelectUpdatedData = "SELECT idUser,username,email,avatar FROM user WHERE idUser = ?";
                    connection.query(sqlSelectUpdatedData, [idUser], (err, result) => {
                        if (err) throw err;

                        const updatedData = result[0];
                        const modifOk = { messageGood: "Votre profil a été mis à jour", updatedData };
                        res.send(modifOk);
                    });
                });
            }
        }
    });



});
;
// récupération l'utilsateur via les cookies
router.get('/userConnected', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        try {
            const decodedToken = jsonwebtoken.verify(token, keyPub, {
                algorithms: "RS256",
            });
            const sql = "SELECT username, idUser,password, email,avatar,ban,role FROM user WHERE idUser = ?";
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
            console.error(error);
        }
    } else {
        res.json(null);
    }
});
// déconnexion 
router.delete('/logout', (req, res) => {
    res.clearCookie('token');
    res.end();
});
// mail reset
router.get("/mailToReset/:email", (req, res) => {
    const email = req.params.email;
    const sqlSearchMail = "SELECT * FROM user WHERE email = ?";
    connection.query(sqlSearchMail, [email], (err, result) => {
        if (err) throw err;
        if (result.length !== 0) {
            // expiration du lien dans les 10 minutes
            const token = jsonwebtoken.sign({}, key, {
                expiresIn: 600,
                algorithm: "RS256"
            });
            const confirmLink = `http://localhost:3000/modifiermdp?email=${email}&token=${token}`;
            const mailOptions = {
                from: 'becque.anthony@gmail.com',
                to: email,
                subject: "Mot de passe oublié Les Dés Gommés",
                text: `Cliquer sur ce lien pour ce lien pour modifier votre mot de passe : ${confirmLink}`
            };
            transporter.sendMail(mailOptions, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.status(200).json({ message: "Un mail a été envoyé" });
                }
            });
        } else {
            res.status(401).json("Cette addresse mail n'est pas utilisée sur ce site");
        }
    });
});
// lien d'inscription
router.get("/confirmAdress/:email", (req, res) => {
    const email = req.params.email;
    const sqlSearchMail = "SELECT * FROM user WHERE email = ?";
    connection.query(sqlSearchMail, [email], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            const token = jsonwebtoken.sign({}, key, {
                expiresIn: 600,
                algorithm: "RS256"
            });
            const confirmLink = `http://localhost:3000/formulaireinscription?email=${email}&token=${token}`;
            const mailOptions = {
                from: 'becque.anthony@gmail.com',
                to: email,
                subject: "Les Dés Gommés - Inscription",
                text: `Cliquer sur ce lien pour ce lien pour finaliser votre inscription : ${confirmLink}`
            };
            transporter.sendMail(mailOptions, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.status(200).json({ message: "Un mail a été envoyé" });
                }
            });
        } else {
            res.status(401).json("Cette addresse mail est déjà utilisée pour ce site.");
        }
    });
});
// modif du password après aveoir récupéré l'utilisateur via le select
router.patch("/updatePassword", (req, res) => {
    const { password } = req.body.password;
    const { email } = req.body;
    const sqlSearch = "SELECT * FROM user WHERE email = ? ";
    connection.query(sqlSearch, [email], async (err, result) => {
        if (err) throw err;

        let idUser = result[0].idUser;
        const sqlUpdatePassword = 'UPDATE user SET password = ? WHERE idUser = ? ';
        const hashedPassword = await bcrypt.hash(password, 10);
        connection.query(sqlUpdatePassword, [hashedPassword, idUser], (err, result) => {
            if (err) throw err;
            res.status(200).json("Mot de passe modifié");
        });
    });
});
// suppression du compte en vérifiant lemail d'abord
router.get("/verify/:email", (req, res) => {
    const email = req.params.email;
    const token = jsonwebtoken.sign({}, key, {
        expiresIn: 600,
        algorithm: "RS256"
    });
    const confirmLink = `http://localhost:3000/suppressioncompte?email=${email}&token=${token}`;
    const mailOptions = {
        from: 'becque.anthony@gmail.com',
        to: email,
        subject: "Les Dés Gommés - Suppression de votre compte",
        text: `Cliquer sur ce lien pour ce lien pour supprimer votre compte : ${confirmLink}`
    };
    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.status(200).json({ message: "Un mail a été envoyé" });
        }
    });
});
router.delete("/deleteAccount/:email", (req, res) => {
    const email = req.params.email;
    const password = req.body.password;
    const sql = "SELECT * from user WHERE email = ?";
    connection.query(sql, [email], async (err, result) => {
        if (err) throw err;
        // on vérifie qu'il ya un résultat et on compare le mot de passe
        if (result[0] && bcrypt.compareSync(password, result[0].password)) {
            // suppression des messages de l'utilisateur
            const sqlDeleteMessage = "DELETE FROM message WHERE idUser = ?";
            connection.query(sqlDeleteMessage, [result[0].idUser], (err, result) => {
                if (err) throw err;
            });
            // suppression de l'utilisateur
            const sqlDeleteUser = "DELETE FROM user WHERE idUser = ?";
            connection.query(sqlDeleteUser, [result[0].idUser], (err, result) => {
                if (err) throw err;
                res.status(200).json('compte utilisateur supprimé');
            });
        } else {
            res.status(400).json("Mot de passe");
        }
    });
});

module.exports = router;