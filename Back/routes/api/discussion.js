const router = require("express").Router();
const connection = require("../../database/index");

router.get('/getMessage', (req, res) => {
    try {
        const sql = "SELECT message.idMessage,message.content,DATE_FORMAT(message.date, '%d-%m-%Y %H:%i:%s') AS formattedDate,message.idUser,message.edit,user.username,user.avatar,user.idUser FROM message,user WHERE message.idUser = user.idUser ORDER BY message.date DESC";
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
            const messageId = result.insertId;
            const sqlGetNewMessage = "SELECT message.idMessage, message.content,DATE_FORMAT(message.date, '%d-%m-%Y %H:%i:%s') AS formattedDate,message.idUser,message.edit,user.username,user.avatar,user.idUser FROM message,user WHERE message.idUser = user.idUser AND idMessage = ?";;
            connection.query(sqlGetNewMessage, [messageId], (err, result) => {
                if (err) throw err;
                console.log(result[0]);
                res.json(result[0]);

            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json("Une erreur est survenue");
    }
});

router.delete("/deleteMessage", (req, res) => {
    try {
        const idMessage = req.body.messageId;
        const sqlDelete = "DELETE FROM message WHERE idMessage = ?";
        connection.query(sqlDelete, [idMessage], (err, result) => {
            if (err) throw err;
            res.status(200).json('Message supprimé');
        });
    } catch (error) {
        console.error(error);
    }
});

router.patch("/updateMessage", (req, res) => {
    try {
        const edit = req.body.edit === true ? "1" : "0";
        const content = req.body.content;
        const id = req.body.idMessage;
        const sql = 'UPDATE message set content = ? , edit = ? WHERE idMessage = ?';
        connection.query(sql, [content, edit, id], (err, result) => {
            if (err) throw err;
            res.send(req.body);
        });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;