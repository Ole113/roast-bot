
const mysql = require("mysql");

exports.run = async () => {
var connection = mysql.createConnection({
    host: "localhost",
    user: "Russ",
    password: "Dbossman1",
    database: "xp_system"
})
database.connect();
}