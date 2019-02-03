const Discord = require("discord.js");

const dbConfigFile = require("../dbConfig.json")
const prefixFile = require("../database/customPrefix/customPrefix.js");

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

    connection.query(`SELECT * FROM roast_bot_xp ORDER BY userXP DESC LIMIT 5;`, function (err, result) {
        if (err) console.log(err);
        connection.query(`SELECT * FROM roast_bot_xp;`, function (err, result) {
            let globalLength = result.length;
            if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}global leaderboard`)) {
                if (globalLength < 5) {
                    return message.channel.send("A leaderboard could not be made because < 5 people have used Roast-Bot.");
                } else {
                    return message.channel.send(`**Global Leaderboard Top 5:**\n\n*🥇 #1:*  **Username:** ${result[0].username} **XP:** ${result[0].userXP} **Level:** ${result[0].userLevel}\n*🥈 #2:*  **Username:** ${result[1].username} **XP:** ${result[1].userXP} **Level:** ${result[1].userLevel}\n*🥉 #3:*   **Username:** ${result[2].username} **XP:** ${result[2].userXP} **Level:** ${result[2].userLevel}\n*#4:*   **Username:** ${result[3].username} **XP:** ${result[3].userXP} **Level:** ${result[3].userLevel}\n*#5:*  **Username:** ${result[4].username} **XP:** ${result[4].userXP} **Level:** ${result[4].userLevel}`);
                }
            }
        });
    });
    connection.query(`SELECT * FROM roast_bot_xp WHERE guildID = "${message.guild.id}" ORDER BY userXP DESC LIMIT 5;`, function (err, result) {
        if (err) console.log(err);
        connection.query(`SELECT * FROM roast_bot_xp WHERE guildID = "${message.guild.id}";`, function (err, result) {
            let serverLength = result.length;

            if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}server leaderboard`)) {
                if (serverLength < 5) {
                    return message.channel.send("A leaderboard could not be made for your server because < 5 people have used Roast-Bot.");
                } else {
                    return message.channel.send(`**Global Leaderboard Top 5:**\n\n*🥇 #1:*  **Username:** ${result[0].username} **XP:** ${result[0].userXP} **Level:** ${result[0].userLevel}\n*🥈 #2:*  **Username:** ${result[1].username} **XP:** ${result[1].userXP} **Level:** ${result[1].userLevel}\n*🥉 #3:*   **Username:** ${result[2].username} **XP:** ${result[2].userXP} **Level:** ${result[2].userLevel}\n*#4:*   **Username:** ${result[3].username} **XP:** ${result[3].userXP} **Level:** ${result[3].userLevel}\n*#5:*  **Username:** ${result[4].username} **XP:** ${result[4].userXP} **Level:** ${result[4].userLevel}`);
                }
            }
        });
    });
}