const router = require("express").Router();
const connection = require("../../database/index");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "becque.anthony@gmail.com",
        pass: "bogl evbq rqgu rdvx"
    }
});
router.patch("/suspendAccount", (req, res) => {
    const { email } = req.body;
    try {
        // on rrécuppère toutes les données de l'utilisateur avec les emails
        const sql = "SELECT * FROM user WHERE email = ?";
        connection.query(sql, [email], (err, result) => {
            if (err) throw err;
            if (result.length) {
                // on modifie la valeur ban
                const sqlUpdate = "UPDATE user SET ban = 1 WHERE email = ?";
                connection.query(sqlUpdate, [email], (err, result) => {
                    if (err) throw err;
                    // envoie un mail pour prévenir de la suspension du compte
                    const mailOptions = {
                        from: 'becque.anthony@gmail.com',
                        to: email,
                        subject: "Compte suspendu - Les Dés Gommés",
                        text: `Bonjour, suite à vos avertissements vous n'avez plus accès à la partie discussion sur le site des Dés Gommés. Vous en souhaitant bonne réception`
                    };
                    transporter.sendMail(mailOptions, (err, result) => {
                        if (err) {
                            throw err;
                        } else {
                            res.status(200).json({ message: "Un mail a été envoyé" });
                        }
                    });
                    res.status(200).json("Utilisateur placé sur liste noire");

                });
            } else {
                // erreur lors de la saisie de l'adresse mail
                res.status(400).json("Cette adresse mail n'est pas dans la base de données");
            }
        });

    } catch (error) {
        console.error(error);
    }
});

module.exports = router;