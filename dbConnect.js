const dbConfigFile = require("./dbConfig.json");

const mysql = require("mysql");

let database;

function connect() {
    if (!database) {
        database = mysql.createConnection(dbConfigFile);

        database.connect(function (err) {
            if (err) console.log(err);
        });
    }
    return database;
}
module.exports = connect();