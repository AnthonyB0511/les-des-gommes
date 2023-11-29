const router = require("express").Router();
const connection = require("../../database");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../keys/index");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
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
        console.log(file);
        cb(null, true);
    }
});

router.post("/register", async (req, res) => {
    const { name, firstname, username, email, password } = req.body;
    const sql = `SELECT * FROM user WHERE email=?`;
    connection.query(sql, [email], async (err, result) => {
        try {
            if (result.length === 0) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const insertSql = "INSERT INTO user(name,firstname,username, email, password,verify) VALUES(?,?,?,?,?,?)";
                const values = [name, firstname, username, email, hashedPassword, 0];
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
    const sqlVerifyMail = `SELECT idUser, username, email FROM user WHERE email = ? AND idUser != ?`;
    const valuesVerifyMail = [email, idUser];
    let avatar;
    if (req.file && req.file.filename) {
        avatar = req.file.filename;
    }
    connection.query(sqlVerifyMail, valuesVerifyMail, (err, result) => {
        if (err) throw err;

        if (result.length) {
            let isEmail = { message: "Cette adresse mail est déjà utilisée" };
            const filePath = path.join(__dirname, "../../uploads/avatar", avatar);

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Erreur suppression d'avatar");
                }
                console.log("Avatar supprimé");
            });

            res.send(isEmail);
        }
    });
    if (req.file) {
        const sqlGetAvatar = "SELECT avatar FROM user WHERE idUser = ?";
        connection.query(sqlGetAvatar, [idUser], (err, result) => {
            if (err) throw err;

            if (result[0].avatar !== null) {
                console.log({ "Result": result[0].avatar });
                const filePathAvatarDB = path.join(__dirname, "../../uploads/avatar", result[0].avatar);
                fs.unlink(filePathAvatarDB, (err) => {
                    if (err) {
                        console.error("Erreur suppression d'avatar");
                    }
                    console.log("Avatar remplacé");
                });
            }
            const sqlUpdateWithAvatar = "UPDATE user SET username = ?, email = ?, avatar = ? WHERE idUser = ?";
            connection.query(sqlUpdateWithAvatar, [username, email, avatar, idUser], (err, result) => {
                if (err) throw err;
                const sqlSelectUpdatedData = "SELECT idUser,username,email,avatar FROM user WHERE idUser = ?";
                connection.query(sqlSelectUpdatedData, [idUser], (err, result) => {
                    if (err) throw err;
                    console.log(result[0]);
                    const updatedData = result[0];
                    const modifOk = { messageGood: "Votre profil a été mis à jour", updatedData };
                    res.send(modifOk);
                });
            });
        });
    } else {
        const sqlUpdate = "UPDATE user SET username = ?, email = ? WHERE idUser = ?";
        connection.query(sqlUpdate, [username, email, idUser], (err, result) => {
            if (err) throw err;
            const sqlSelectUpdatedData = "SELECT idUser,username,email,avatar FROM user WHERE idUser = ?";
            connection.query(sqlSelectUpdatedData, [idUser], (err, result) => {
                if (err) throw err;
                console.log(result);
                const updatedData = result[0];
                const modifOk = { messageGood: "Votre profil a été mis à jour", updatedData };
                res.send(modifOk);
            });
        });
    }


});
;

router.get('/userConnected', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        try {
            const decodedToken = jsonwebtoken.verify(token, keyPub, {
                algorithms: "RS256",
            });
            const sql = "SELECT username, idUser,firstname, name,password, email,avatar,role FROM user WHERE idUser = ?";
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

router.delete('/logout', (req, res) => {
    res.clearCookie('token');
    res.end();
});

module.exports = router;