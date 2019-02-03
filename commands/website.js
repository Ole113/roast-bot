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

    if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}website help`)) {
        return message.channel.send("Coming soon!");
    }
    if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}website`)) {
        let websiteEmbed = new Discord.RichEmbed()
            .setColor("#EB671D")
            .setTitle("roast-bot.com  <:roast_circle:474755210485563404>")
            .setURL("http://www.roast-bot.com")
            .setFooter("Roast-Bot v2.3.0");
        return message.channel.send({ embed: websiteEmbed });
    }
}