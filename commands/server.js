/*
*
*   Things to add to rb!server:
* ----------------------------
*  Add more stats such as how many text channels their are and how many voice.
*
*/

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
        if (message.content.toLowerCase() === prefix + "server help") {
            return message.channel.send("**rb!server help:**\n\n`rb!server` tells you information about your server. The information that it provides is: Number of people in server, Server name, the date you joined, and the date the server was created.\n\n*Example:\n\n*USER: rb!server\nRoast-Bot: Server Name....\nDate the server was created....\nDate you joined....\nNumber of people in the server....\n\n`rb!server` will still work even if you put 1 or more space after the \"server\".  It will not work however if you put 1 or more spaces and then a character that isn\'t a space. \n\n\n  If your still having trouble with rb!clear NUMBER please join the support server and ask in #roast-bot-help. \n\n\n\nServer Invite Link: https://discordapp.com/invite/9y8yV42");
        }
        if (message.content.toLowerCase() === prefix + "server") {
            let serverIcon = message.guild.iconURL;
            let serverEmbed = new Discord.RichEmbed()
                .setColor("#EB671D")
                .setTitle("Server Information:")
                .addBlankField()
                .setThumbnail(serverIcon)
                .addField("Server Name:", message.guild.name)
                .addField("Created On:", message.guild.createdAt)
                .addField("You Joined:", message.member.joinedAt)
                .addField("Total Members:", message.guild.memberCount);
            return message.channel.send({ embed: serverEmbed });
        } /*else if (message.content.toLowerCase() === prefix + "server") {
        return message.channel.send("This command has been turned off by an administrator.");
    }*/
    });
};