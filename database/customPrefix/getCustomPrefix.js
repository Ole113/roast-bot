const dbConfigFile = require("../../dbConfig.json")

const mysql = require("mysql");

let connection = mysql.createConnection({
    host: dbConfigFile.host,
    user: dbConfigFile.user,
    password: dbConfigFile.password,
    database: dbConfigFile.database,
    port: dbConfigFile.port
});

connection.connect();

module.exports.getPrefix = function getPrefix() {

    connection.query(`SELECT * FROM roast_bot_custom_prefix WHERE guildID = "${message.guild.id}";`, function (err, result) {
        //makes a variable that will be rewritten every time the query is called, default is rb!.
        let prefix = "rb!";
        
        if (err) console.log(err);
        //checks if prefix has been set or not and sets prefix to it.
        if (result.length) return prefix = result[0].prefix;
    });
}