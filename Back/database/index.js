const mysql = require("mysql");
// connexion à la bbase de données
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "desgommes",
});

connection.connect((err) => {
    if (err) throw err;
    // vérification de la co
    console.log("Connecté à la base de données MySQL");
});

module.exports = connection;