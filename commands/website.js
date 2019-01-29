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
        if (message.content.toLowerCase().startsWith(prefix + "website help")) {
            return message.channel.send("Coming soon!");
        }
        if (message.content.toLowerCase().startsWith(prefix + "website")) {
            let websiteEmbed = new Discord.RichEmbed()
                .setColor("#EB671D")
                .setTitle("roast-bot.com  <:roast_circle:474755210485563404>")
                .setURL("http://www.roast-bot.com")
                .setFooter("Roast-Bot v2.3.0");
            return message.channel.send({ embed: websiteEmbed });
        }
    });
}