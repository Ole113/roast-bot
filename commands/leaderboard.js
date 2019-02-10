const Discord = require("discord.js");

const connection = require("../dbConnect.js");
const prefixFile = require("../database/customPrefix/customPrefix.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }

    connection.query(`SELECT * FROM roast_bot_xp ORDER BY userXP DESC LIMIT 5;`, function (err, result) {
        if (err) console.log(err);
        let globalLength = result.length;
        if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}global leaderboard`)) {
            if (globalLength < 5) {
                return message.channel.send("A leaderboard could not be made because less than 5 people have used Roast-Bot in your server.");
            } else {
                return message.channel.send(`*Global Leaderboard Top 5:*\`\`\`asciidoc
= ${result[0].username} =\n• XP :: ${result[0].userXP}\n• Level :: ${result[0].userLevel}\n\n= ${result[1].username} =\n• XP :: ${result[1].userXP}\n• Level :: ${result[1].userLevel}\n\n= ${result[2].username} =\n• XP :: ${result[2].userXP}\n• Level :: ${result[2].userLevel} \n\n= ${result[3].username} =\n• XP :: ${result[3].userXP}\n• Level :: ${result[3].userLevel} \n\n= ${result[4].username} =\n• XP :: ${result[4].userXP}\n• Level :: ${result[4].userLevel}\`\`\``);
            }
        }
    });
    connection.query(`SELECT * FROM roast_bot_xp WHERE guildID = "${message.guild.id}" ORDER BY userXP DESC LIMIT 5;`, function (err, result) {
        if (err) console.log(err);
        let serverLength = result.length;

        if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}server leaderboard`)) {
            if (serverLength < 5) {
                return message.channel.send("A leaderboard could not be made because less than 5 people have used Roats-Bot in your server.");
            } else {
                return message.channel.send(`*Server Leaderboard Top 5:*\`\`\`asciidoc
= ${result[0].username} =\n• XP :: ${result[0].userXP}\n• Level :: ${result[0].userLevel}\n\n= ${result[1].username} =\n• XP :: ${result[1].userXP}\n• Level :: ${result[1].userLevel}\n\n= ${result[2].username} =\n• XP :: ${result[2].userXP}\n• Level :: ${result[2].userLevel} \n\n= ${result[3].username} =\n• XP :: ${result[3].userXP}\n• Level :: ${result[3].userLevel} \n\n= ${result[4].username} =\n• XP :: ${result[4].userXP}\n• Level :: ${result[4].userLevel}\`\`\``);
            }
        }
    });
}