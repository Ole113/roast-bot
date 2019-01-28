/*
*
*   Things to add to rb!meme:
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
        connection.query(`SELECT * FROM roast_bot_on_off WHERE guildID = "${message.guild.id}";`, function (err, result) {
            let update;
            let memeStatus = result[0].meme;
            if ((message.content.toLowerCase().startsWith(`${prefix}meme on`) || message.content.toLowerCase().startsWith(`${prefix}meme off`)) && !message.member.hasPermission("ADMINISTRATOR")) {
                return message.channel.send("You need to be an admin to turn this command on/off.");
            } else if (message.content.toLowerCase().startsWith(`${prefix}meme on`)) {
                if (err) console.log(err);

                if (result[0].meme) {
                    return message.channel.send(`This command is already on, use *${prefix}meme off* to turn it off.`);
                } else if (!result[0].meme) {
                    update = `UPDATE roast_bot_on_off SET username = "${message.author.username}", meme = "${1}" WHERE guildID = "${message.guild.id}";`;
                    updateMeme();
                    return message.channel.send(`Meme command has been turned on, use *${prefix}meme off* to turn it back off.`);
                }
            } else if (message.content.toLowerCase().startsWith(`${prefix}meme off`)) {
                if (err) console.log(err);

                if (!result[0].meme) {
                    return message.channel.send(`This command is already off, use *${prefix}meme on* to turn it on.`)
                } else if (result[0].meme) {
                    update = `UPDATE roast_bot_on_off SET username = "${message.author.username}", meme = "${0}" WHERE guildID = "${message.guild.id}";`;
                    updateMeme();
                    return message.channel.send(`Meme command has been turned off, use *${prefix}meme on* to turn it back on.`);
                }
            }
            function updateMeme() {
                connection.query(update, function (err, result) {
                    if (err) console.log(err);
                });
            }
            if (message.content.toLowerCase() === prefix + "meme help" || message.content.toLowerCase() === "rb!") {
                return message.channel.send("**rb!meme help:**\n\nrb!meme has 2 ways that it can be used.  These 2 ways are as follows:\n**rb!meme**\n**rb!meme #memeNumber**\n\n**rb!meme** will generate a random meme. You can put `rb!meme `, notice the space and it will also generate a random meme the same as `rb!meme` with no space would.\n\nExample:\nUSER: rb!meme\nRoast-Bot: Meme #someNumber `a meme`\n\n**rb!meme #memeNumber** is almost as simple as `rb!meme`,  the only difference is that `memeNumber`, is which meme you want to be sent.\n\nExample:\nUSER:rb!meme #12\nRoast-Bot: Meme #12`meme picture`\n\nStill having trouble with rb!meme or have a suggestion? Join the support server:\nhttps://discordapp.com/invite/9y8yV42");
            }
            if ((message.content.toLowerCase().startsWith(`${prefix}meme`) || message.content.toLowerCase() === "rb!") && memeStatus) {
                const randomMemes = Math.ceil(Math.random() * 536);
                if (message.content.toLowerCase().startsWith(`${prefix}meme #`) || message.content.toLowerCase().startsWith("rb!meme #")) {
                    let word2 = message.content;
                    let number2 = word2.slice(prefix.length + 6, word2.length);
                    let numberInt1 = parseInt(number2);
                    if (numberInt1 > 536) {
                        return message.channel.send("Sorry that meme couldn't be found :(");
                    }
                    return message.channel.send(`Meme #${numberInt1} <:roast_circle:474755210485563404>`, { files: [`images/meme${numberInt1}.PNG`] });
                } else {
                    return message.channel.send(`Meme #${randomMemes} <:roast_circle:474755210485563404>`, { files: [`images/meme${randomMemes}.PNG`] });
                }
            } else if ((message.content.toLowerCase().startsWith(`${prefix}meme`) || message.content.toLowerCase().startsWith("rb!meme")) && !memeStatus) {
                return message.channel.send("This command has been turned off by an administrator.");
            }
        });
    });
};