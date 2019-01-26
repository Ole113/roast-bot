/*
*
*   Things to add to rb!invite:
* ----------------------------
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
        if (message.content.toLowerCase() === prefix + "vid help") {
            return message.channel.send("coming soon");
        }
        if (message.content.toLowerCase() === prefix + "vid") {
            let randomNumber = Math.floor(Math.random() * 7 + 1);
            return message.channel.send(`Video #${randomNumber} <:roast_circle:474755210485563404>`, { files: [`videos/vid${randomNumber}.gif`] });
        } else if (message.content.toLowerCase() === prefix + "vid") {
            return message.channel.send("This command has been turned off by an administrator.");
        }
        if (message.content.startsWith(prefix + "vid #")) {
            let content = message.content;
            let vidNumber = content.slice(prefix.length + 5, content.length);
            let vidNumberInt = parseInt(vidNumber);
            if (vidNumberInt > 7 || vidNumberInt <= 0) {
                return message.channel.send("Sorry that video couldn't be found. <:roast_circle:474755210485563404>");
            }
            return message.channel.send(`Video #${vidNumberInt} <:roast_circle:474755210485563404>`, { files: [`videos/vid${vidNumberInt}.gif`] });
        } /*else if(message.content.toLowerCase().startsWith(prefix + "vid #")) {
        return message.channel.send("This command has been turned off by an administrator.");   
    } */
    });
};