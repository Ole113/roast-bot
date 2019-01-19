const Discord = require("discord.js");

const mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "roast_bot"
});

connection.connect();

exports.run = async (message) => {
    if (message.author.bot) { return; }

    let user = {
        username: message.author,
        userID: message.author.id,
        xp: 0,
        level: 0
    }

    let query = connection.query("insert into roast_bot set ?", user, function(err, result) {
        if(err) {
            console.error(err);
            return;
        }
        console.error(result);
    });
}
exports.user = user;