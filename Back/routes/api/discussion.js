const router = require("express").Router();
const connection = require("../../database/index");

router.get('/getMessage', (req, res) => {
    try {
        const sql = "SELECT message.idMessage,message.content,DATE_FORMAT(message.date, '%d-%m-%Y %H:%i:%s') AS formattedDate,message.idUser,message.edit,user.username,user.avatar,user.idUser FROM message,user WHERE message.idUser = user.idUser ORDER BY message.date ASC";
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.send(JSON.stringify(result));
        });
    } catch (error) {
        console.error(error);
    }
});

router.post("/sendMessage", (req, res) => {
    try {
        const idUser = req.body.idUser;
        const content = req.body.content.content;
        const sqlAddMessage = "INSERT INTO message (content,idUser,edit,date) VALUES (?, ?,0,NOW())";
        const values = [content, idUser];
        connection.query(sqlAddMessage, values, (err, result) => {
            if (err) throw err;
            res.status(200).json("Message envoyé");
        });
    } catch (error) {
        console.error(error);
        res.status(500).json("Une erreur est survenue");
    }
});

module.exports = router;