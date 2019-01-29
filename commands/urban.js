/*
*
*   Things to add to r!urban:
* ----------------------------
*  Remove brackets with message.content.replace(whatever the syntax is);
*  Make it so if the word is not found it will only say Word not found and wont send the other info of undefined.
*/

const urban = require("relevant-urban");
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
            let urbanStatus = result[0].urban;
            if ((message.content.toLowerCase().startsWith(`${prefix}urban on`) || message.content.toLowerCase().startsWith(`${prefix}urban off`)) && !message.member.hasPermission("ADMINISTRATOR")) {
                return message.channel.send("You need to be an admin to turn this command on/off.");
            } else if (message.content.toLowerCase().startsWith(`${prefix}urban on`)) {
                if (err) console.log(err);

                if (result[0].urban) {
                    return message.channel.send(`This command is already on, use *${prefix}urban off* to turn it off.`);
                } else if (!result[0].urban) {
                    update = `UPDATE roast_bot_on_off SET username = "${message.author.username}", urban = "${1}" WHERE guildID = "${message.guild.id}";`;
                    updateUrban();
                    return message.channel.send(`Urban command has been turned on, use *${prefix}urban off* to turn it back off.`);
                }
            } else if (message.content.toLowerCase().startsWith(`${prefix}urban off`)) {
                if (err) console.log(err);

                if (!result[0].urban) {
                    return message.channel.send(`This command is already off, use *${prefix}urban on* to turn it on.`)
                } else if (result[0].urban) {
                    update = `UPDATE roast_bot_on_off SET username = "${message.author.username}", urban = "${0}" WHERE guildID = "${message.guild.id}";`;
                    updateUrban();
                    return message.channel.send(`Urban command has been turned off, use *${prefix}urban on* to turn it back on.`);
                }
            }
            function updateUrban() {
                connection.query(update, function (err, result) {
                    if (err) console.log(err);
                });
            }
            if (message.content.toLowerCase() == prefix + "urban help") {
                return message.channel.send("**r!urban help**:\n\nUnlike some other commands r!urban only has 1 usage. To use r!urban you only need to specify one thing, what to search.\n\nExample:\n\nUSER: r!urban test\nRoast-Bot: \n*test*\nDefinition:\n1. the main cause of [explosions].\n2. any thing [dreaded] that your \"teachers\" say is \"good\" for you. soon after, you explode for no reason.\n3. what scientists do to make stuff explode.\n4. when a sheet of paper explodes into [flames].\n\nExample:\n\n1. test [sodium] and water.\n2. SAT is a test.\n3. [Monkeys].\n4. you brought your [lighter] to test.\nAuthor:\nmonn-unit\nRating:\nUpvotes: :thumbsup: 126 | Downvotes: :thumbsdown: 35*\n\nStill having trouble with r!meme or have a suggestion? Join the support server:\nhttps://discordapp.com/invite/9y8yV42");
            }
            if (message.content.toLowerCase().startsWith(prefix + "urban") && urbanStatus) {
                let word = message.content;
                let args = word.slice(prefix.length + 5, word.length);
                if (args == "") {
                    return message.channel.send("Please enter something to search up.  <:roast_circle:474755210485563404>");
                }
                async function requiredAsyncFunction() {
                    let res = await urban(args).catch(e => {
                        return message.channel.send("Word not found. <:roast_circle:474755210485563404>");
                    });
                    const urbanEmbed = new Discord.RichEmbed()
                        .setColor("#EB671D")
                        .setTitle(res.word)
                        .setURL(res.urbanURL)
                        .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n${res.example}`)
                        .addField("Author:", res.author, true)
                        .addField("Rating:", `**Upvotes: :thumbsup:** ${res.thumbsUp} | **Downvotes: :thumbsdown:** ${res.thumbsDown}`);

                    return message.channel.send({ embed: urbanEmbed });
                }
                requiredAsyncFunction();
            } else if (message.content.toLowerCase().startsWith(prefix + "urban") && !urbanStatus) {
                return message.channel.send("This command has been turned off by an administrator.");
            }
        });
    });
}