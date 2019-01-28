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
        connection.query(`SELECT * FROM roast_bot_on_off WHERE guildID = "${message.guild.id}";`, function (err, result) {
            let update;
            let serverStatus = result[0]._server;
            if ((message.content.toLowerCase().startsWith(`${prefix}server on`) || message.content.toLowerCase().startsWith(`${prefix}server off`)) && !message.member.hasPermission("ADMINISTRATOR")) {
                return message.channel.send("You need to be an admin to turn this command on/off.");
            } else if (message.content.toLowerCase().startsWith(`${prefix}server on`)) {
                if (err) console.log(err);

                if (result[0]._server) {
                    return message.channel.send(`This command is already on, use *${prefix}server off* to turn it off.`);
                } else if (!result[0]._server) {
                    update = `UPDATE roast_bot_on_off SET username = "${message.author.username}", _server = "${1}" WHERE guildID = "${message.guild.id}";`;
                    updateServer();
                    return message.channel.send(`Server command has been turned on, use *${prefix}server off* to turn it back off.`);
                }
            } else if (message.content.toLowerCase().startsWith(`${prefix}server off`)) {
                if (err) console.log(err);

                if (!result[0]._server) {
                    return message.channel.send(`This command is already off, use *${prefix}server on* to turn it on.`)
                } else if (result[0]._server) {
                    update = `UPDATE roast_bot_on_off SET username = "${message.author.username}", _server = "${0}" WHERE guildID = "${message.guild.id}";`;
                    updateServer();
                    return message.channel.send(`Server command has been turned off, use *${prefix}server on* to turn it back on.`);
                }
            }
            function updateServer() {
                connection.query(update, function (err, result) {
                    if (err) console.log(err);
                });
            }
            if (message.content.toLowerCase() === prefix + "server help") {
                return message.channel.send("**rb!server help:**\n\n`rb!server` tells you information about your server. The information that it provides is: Number of people in server, Server name, the date you joined, and the date the server was created.\n\n*Example:\n\n*USER: rb!server\nRoast-Bot: Server Name....\nDate the server was created....\nDate you joined....\nNumber of people in the server....\n\n`rb!server` will still work even if you put 1 or more space after the \"server\".  It will not work however if you put 1 or more spaces and then a character that isn\'t a space. \n\n\n  If your still having trouble with rb!server please join the support server and ask in #roast-bot-help. \n\n\n\nServer Invite Link: https://discordapp.com/invite/9y8yV42");
            }
            if (message.content.toLowerCase() === prefix + "server" && serverStatus) {
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
            } else if (message.content.toLowerCase() === prefix + "server" && !serverStatus) {
                return message.channel.send("This command has been turned off by an administrator.");
            }
        });
    });
};