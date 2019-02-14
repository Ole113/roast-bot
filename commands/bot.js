/*
*
*   Things to add to rb!bot:
* ----------------------------
*  Add more stats in the future.
*
*/

const Discord = require("discord.js");

const connection = require("../dbConnect.js");
const prefixFile = require("../database/customPrefix/customPrefix.js");

exports.run = async (client, message) => {
    if (message.author.bot) { return; }

    if (message.content.toLowerCase().startsWith(prefixFile.prefix || "rb!")) {
        connection.query(`SELECT * FROM roast_bot_on_off WHERE guildID = "${message.guild.id}";`, function (err, result) {
            let update;
            let botStatus = result[0].bot;
            if ((message.content.toLowerCase().startsWith(`${prefixFile.prefix}bot on`) || message.content.toLowerCase().startsWith(`${prefixFile.prefix}server off`)) && !message.member.hasPermission("ADMINISTRATOR")) {
                return message.channel.send("You need to be an admin to turn this command on/off.");
            } else if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}bot on`)) {
                if (err) console.log(err);

                if (result[0].bot) {
                    return message.channel.send(`This command is already on, use *${prefixFile.prefix}bot off* to turn it off.`);
                } else if (!result[0].bot) {
                    update = `UPDATE roast_bot_on_off SET username = "${message.author.username}", _bot = "${1}" WHERE guildID = "${message.guild.id}";`;
                    updateBot();
                    return message.channel.send(`Bot command has been turned on, use *${prefixFile.prefix}bot off* to turn it back off.`);
                }
            } else if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}bot off`)) {
                if (err) console.log(err);

                if (!result[0].bot) {
                    return message.channel.send(`This command is already off, use *${prefixFile.prefix}bot on* to turn it on.`)
                } else if (result[0].bot) {
                    update = `UPDATE roast_bot_on_off SET username = "${message.author.username}", bot = "${0}" WHERE guildID = "${message.guild.id}";`;
                    updateBot();
                    return message.channel.send(`Bot command has been turned off, use *${prefixFile.prefix}bot on* to turn it back on.`);
                }
            }
            function updateBot() {
                connection.query(update, function (err, result) {
                    if (err) console.log(err);
                });
            }
            if (message.content.toLowerCase() === `${prefixFile.prefix}bot help`) {
                return message.channel.send("**rb!bot help:**\n\n`rb!bot` tells information about Roast-Bot. The information includes: Bot name, created on , Roast-Bot server count, total number of roasts, and total number of memes.\n\nExample:\n\nUSER: rb!bot\nRoast-Bot:\nBot Information:\n\nBot Name:\nRoast-Bot\nCreated On:\nWed Jun 27 2018 02:44:49 GMT+0000 (UTC)\nServer Count:\n328\nTotal Number of Roasts:\n100\nTotal Number of Memes:\n131\n\nCreated By Ole113#2421\n\n\nNote: Stats are from 08/26/2018 and are not current, use rb!bot for current stats.");
            }
            if (message.content.toLowerCase() === `${prefixFile.prefix}bot` && botStatus) {
                let botIcon = client.user.displayAvatarURL;
                let botEmbed = new Discord.RichEmbed()
                    .setColor("#EB671D")
                    .setTitle("<:roast_circle:474755210485563404> Bot Information:")
                    .addBlankField()
                    .setThumbnail(botIcon)
                    .addField("Bot Name:", client.user.username)
                    .addField("Created On:", client.user.createdAt)
                    .addField("Server Count:", client.guilds.size)
                    .addField("Total Number of Roasts:", "135", true)
                    .addField("Total Number of Memes:", "536", true)
                    .addField("User Count:", client.users.size, true)
                    .addField("Website:", "http://roast-bot.com", true)
                    .addField("Number of Commands:", "15")
                    .setFooter("Created By Ole113#2421");
                return message.channel.send({ embed: botEmbed });
            } else if (message.content.toLowerCase() === `${prefixFile.prefix}bot` && !botStatus) {
                return message.channel.send("This command has been turned off by an administrator.");
            }

        });
    }
};