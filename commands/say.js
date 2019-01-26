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

            if (message.content.toLowerCase().startsWith(`${prefix}say on`)) {
                if (err) console.log(err);

                if (!result.length) {
                    return message.channel.send("ERR1");
                }
                if (result[0].say) {
                    return message.channel.send("This command is already on, use `rb!say off` to turn it off.")
                } else if (!result[0].say) {
                    update = `UPDATE roast_bot_on_off SET username = "${message.author.username}", say = "${1}" WHERE guildID = "${message.guild.id}";`;
                    updateOnOff();
                    return message.channel.send("Say command has been turned on, use `rb!say off` to turn it back off.");
                } else {
                    return message.channel.send("ERR");
                }
            } else if (message.content.toLowerCase().startsWith(`${prefix}say off`)) {
                if (err) console.log(err);
                
                if (!result[0].say) {
                    return message.channel.send("This command is already off, use `rb!say on` to turn it on.")
                } else if (result[0].say) {
                    update = `UPDATE roast_bot_on_off SET username = "${message.author.username}", say = "${0}" WHERE guildID = "${message.guild.id}";`;
                    updateOnOff();
                    return message.channel.send("Say command has been turned off, use `rb!say on` to turn it back on.");
                } else {
                    return message.channel.send("ERR");
                }
            }
            function updateOnOff() {
                connection.query(update, function (err, result) {
                    if (err) console.log(err);
                });
            }
            
        });

        if (message.content.toLowerCase() === prefix + "say" || message.content.toLowerCase() === prefix + "say  ") {
            return message.channel.send("Please provide what you want Roast-Bot to say. The correct usage is `rb!say whatToSay`. ");
        }

        if (message.content.toLowerCase() === prefix + "say help") {
            return message.channel.send("**rb!say help:**\n\nTo use `rb!say whatToSay` \"whatToSay\" is want you want the bot to say.\n\n*Example:*\n\nUSER: rb!say Hello!\nRoast-Bot: Hello!\n\nIf you accidentally use `rb!say` with one or more spaces after rb!say without saying what you want Roast-Bot to say, Roast-Bot will return a warning of \"Please provide what you want Roast-Bot to say. The correct usage is `rb!say whatToSay`.\"\n\nStill having trouble with rb!meme or have a suggestion? Join the support server:\nhttps://discordapp.com/invite/9y8yV42");
        }
        if (message.content.toLowerCase().startsWith(prefix + "say ")) {
            const word = message.content;
            const say = word.slice(prefix.length + 4, word.length);
            return message.channel.send(say);
        } /*else if (message.content.toLowerCase().startsWith(prefix + "say ")) {
            return message.channel.send("This command has been turned off by an administrator.");
        }*/
    });
};