const Discord = require("discord.js");

const dbConfigFile = require("../dbConfig.json")
const roastFile = require("./roast.js");

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
            let roastStatus = result[0].roast;
            if (message.content.toLowerCase().startsWith(`${prefix}search`) && !roastStatus) {
                return message.channel.send("You cannot search roasts because the Roast command has been turned off by an administrator.");
            } else if (message.content.toLowerCase().startsWith(`${prefix}search `)) {
                let searchParam = message.content.slice(prefix.length + 7, message.content.length);
                let found = ""
                let totalLength = 0;
                for(let i = 0; i < roastFile.roasts.length; i++) {
                    if (roastFile.roasts[i].roast.includes(searchParam)) {
                        totalLength += roastFile.roasts[i].roast.length;
                        found += roastFile.roasts[i].roast + "\n";
                    }
                }
                if(totalLength > 2000) {
                    return message.channel.send(`There were too many roasts found that have *${searchParam}* in them, try being more specific.`);
                }
                return message.channel.send(`**Results:** \n\n${found}`);
            }
        });
    });
};