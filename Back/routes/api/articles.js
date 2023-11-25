const router = require("express").Router();
const connection = require("../../database/index");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { log } = require("console");
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, "../../uploads/imgArticles"));
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        // console.log(file);
        cb(null, true);
    }
});

router.get('/readArticle', (req, res) => {
    try {
        const sql = "SELECT * FROM article";
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.send(JSON.stringify(result));
        });
    } catch (error) {
        console.error(error);
    }
});

router.patch('/updateArticle', upload.single("photo"), async (req, res) => {
    const { title, content, descriptionPhoto } = req.body;
    const idArticle = req.query.idArticle;
    console.log(idArticle);
    let photo;
    if (req.file) {
        photo = req.file.filename;
    } else {
        photo = null;
    }

    const sqlGetPhoto = "SELECT * FROM article WHERE idArticle = ?";
    connection.query(sqlGetPhoto, [idArticle], (err, result) => {
        if (err) throw err;
        console.log(result[0].photo);
        const filePathPhotoDB = path.join(__dirname, "../../uploads/imgArticles", result[0].photo);
        fs.unlink(filePathPhotoDB, (err) => {
            if (err) {
                console.error;
            }
            console.log("Photo remplacée");
        });
        const sqlUpdate = "UPDATE article SET title = ?, content = ? , descriptionPhoto = ? , photo = ? WHERE idArticle = ?";
        connection.query(sqlUpdate, [title, content, descriptionPhoto, photo, idArticle], (err, result) => {
            if (err) throw err;
            res.status(200);
        });
        const sqlGetArticleUpdate = "SELECT * FROM article";
        connection.query(sqlGetArticleUpdate, (err, result) => {
            if (err) throw err;
            res.send(JSON.stringify(result));
        });
    });
});
module.exports = router;