/*
*
*   Things to add to rb!invite:
* ----------------------------
* 
*/

const Discord = require("discord.js");

const dbConfigFile = require("../dbConfig.json")

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
            let vidStatus = result[0].vid;
            if ((message.content.toLowerCase().startsWith(`${prefix}vid on`) || message.content.toLowerCase().startsWith(`${prefix}vid off`)) && !message.member.hasPermission("ADMINISTRATOR")) {
                return message.channel.send("You need to be an admin to turn this command on/off.");
            } else if (message.content.toLowerCase().startsWith(`${prefix}vid on`)) {
                if (err) console.log(err);

                if (result[0].vid) {
                    return message.channel.send(`This command is already on, use *${prefix}vid off* to turn it off.`);
                } else if (!result[0].vid) {
                    update = `UPDATE roast_bot_on_off SET username = "${message.author.username}", vid = "${1}" WHERE guildID = "${message.guild.id}";`;
                    updateVid();
                    return message.channel.send(`Vid command has been turned on, use *${prefix}vid off* to turn it back off.`);
                }
            } else if (message.content.toLowerCase().startsWith(`${prefix}vid off`)) {
                if (err) console.log(err);

                if (!result[0].vid) {
                    return message.channel.send(`This command is already off, use *${prefix}vid on* to turn it on.`)
                } else if (result[0].vid) {
                    update = `UPDATE roast_bot_on_off SET username = "${message.author.username}", vid = "${0}" WHERE guildID = "${message.guild.id}";`;
                    updateVid();
                    return message.channel.send(`Vid command has been turned off, use *${prefix}vid on* to turn it back on.`);
                }
            }
            function updateVid() {
                connection.query(update, function (err, result) {
                    if (err) console.log(err);
                });
            }
            if (message.content.toLowerCase() === prefix + "vid help") {
                return message.channel.send("coming soon");
            }
            if (message.content.toLowerCase() === prefix + "vid" && vidStatus) {
                let randomNumber = Math.floor(Math.random() * 7 + 1);
                return message.channel.send(`Video #${randomNumber} <:roast_circle:474755210485563404>`, { files: [`videos/vid${randomNumber}.gif`] });
            } else if (message.content.toLowerCase() === prefix + "vid") {
                return message.channel.send("This command has been turned off by an administrator.");
            }
            if (message.content.startsWith(prefix + "vid #") && vidStatus) {
                let content = message.content;
                let vidNumber = content.slice(prefix.length + 5, content.length);
                let vidNumberInt = parseInt(vidNumber);
                if (vidNumberInt > 7 || vidNumberInt <= 0) {
                    return message.channel.send("Sorry that video couldn't be found. <:roast_circle:474755210485563404>");
                }
                return message.channel.send(`Video #${vidNumberInt} <:roast_circle:474755210485563404>`, { files: [`videos/vid${vidNumberInt}.gif`] });
            } else if (message.content.toLowerCase().startsWith(prefix + "vid #") && !vidStatus) {
                return message.channel.send("This command has been turned off by an administrator.");
            }
        });
    });
};