const Discord = require("discord.js");

const dbConfigFile = require("./dbConfig.json")

const mysql = require("mysql");

let connection = mysql.createConnection({
    host: dbConfigFile.host,
    user: dbConfigFile.user,
    password: dbConfigFile.password,
    database: dbConfigFile.database,
    port: dbConfigFile.port
});

connection.connect();

exports.run = async (message) => {
    if (message.author.bot) { return; }

    connection.query(`SELECT * FROM roast_bot_custom_prefix WHERE guildID = "${message.guild.id}";`, function (err, result) {
        //makes a variable that will be rewritten every time the query is called, default is rb!.
        let prefix = "rb!";
        if (err) console.log(err);
        //checks if prefix has been set or not and sets prefix to it.
        if (result.length) prefix = result[0].prefix;
        connection.query(`SELECT * FROM roast_bot_xp ORDER BY userXP DESC LIMIT 5;`, function(err, result) {
            if (message.content.toLowerCase().startsWith(`${prefix}global leaderboard`)) {
                return message.channel.send(`**Global Leaderboard Top 5:**\n\n*#1*  **Username:** ${result[0].username} **XP:** ${result[0].userXP} **Level:** ${result[0].userLevel}\n*#2:*  **Username:** ${result[1].username} **XP:** ${result[1].userXP} **Level:** ${result[1].userLevel}\n*#3:*   **Username:** ${result[2].username} **XP:** ${result[2].userXP} **Level:** ${result[2].userLevel}\n*#4:*   **Username:** ${result[3].username} **XP:** ${result[3].userXP} **Level:** ${result[3].userLevel}\n*#5:*  **Username:** ${result[4].username} **XP:** ${result[4].userXP} **Level:** ${result[4].userLevel}`);
            }
        });
    });
}