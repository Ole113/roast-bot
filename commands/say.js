const Discord = require("discord.js");

const prefixFile = require("../database/customPrefix/customPrefix.js");
const connection = require("../dbConnect.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }
    if (message.content.toLowerCase().startsWith(prefixFile.prefix || "r!")) {
        connection.query(`SELECT * FROM roast_bot_on_off WHERE guildID = "${message.guild.id}";`, function (err, result) {
            let update;
            let onOrOff = result[0].say;
            if ((message.content.toLowerCase().startsWith(`${prefixFile.prefix}say on`) || message.content.toLowerCase().startsWith(`${prefixFile.prefix}say off`)) && !message.member.hasPermission("ADMINISTRATOR")) {
                return message.channel.send("You need to be an admin to turn this command on/off.");
            } else if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}say on`)) {
                if (err) console.log(err);

                if (result[0].say) {
                    return message.channel.send(`This command is already on, use *${prefixFile.prefix}say off* to turn it off.`);
                } else if (!result[0].say) {
                    update = `UPDATE roast_bot_on_off SET username = "${message.author.username}", say = "${1}" WHERE guildID = "${message.guild.id}";`;
                    updateOnOff();
                    return message.channel.send(`Say command has been turned on, use *${prefixFile.prefix}say off* to turn it back off.`);
                }
            } else if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}say off`)) {
                if (err) console.log(err);

                if (!result[0].say) {
                    return message.channel.send(`This command is already off, use *${prefixFile.prefix}say on* to turn it on.`);
                } else if (result[0].say) {
                    update = `UPDATE roast_bot_on_off SET username = "${message.author.username}", say = "${0}" WHERE guildID = "${message.guild.id}";`;
                    updateOnOff();
                    return message.channel.send(`Say command has been turned off, use *${prefixFile.prefix}say on* to turn it back on.`);
                }
            }
            function updateOnOff() {
                connection.query(update, function (err, result) {
                    if (err) console.log(err);
                });
            }

            if (message.content.toLowerCase() === `${prefixFile.prefix}say` || message.content.toLowerCase() === `${prefixFile.prefix}say ` && onOrOff) {
                return message.channel.send("Please provide what you want Roast-Bot to say. The correct usage is `r!say whatToSay`. ");
            }

            if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}say help`)) {
                return message.channel.send("**r!say help:**\n\nTo use `r!say whatToSay` \"whatToSay\" is want you want the bot to say.\n\n*Example:*\n\nUSER: r!say Hello!\nRoast-Bot: Hello!\n\nIf you accidentally use `r!say` with one or more spaces after r!say without saying what you want Roast-Bot to say, Roast-Bot will return a warning of \"Please provide what you want Roast-Bot to say. The correct usage is `r!say whatToSay`.\"\n\nStill having trouble with r!meme or have a suggestion? Join the support server:\nhttps://discordapp.com/invite/9y8yV42");
            }
            if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}say `) && !(message.content.includes(`${prefixFile.prefix}say on`) || message.content.includes(`${prefixFile.prefix}say off`)) && onOrOff) {
                const say = message.content.slice(prefixFile.prefix.length + 4, message.content.length);
                return message.channel.send(say);
            } else if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}say `) && !onOrOff) {
                return message.channel.send("This command has been turned off by an administrator.");
            }
        });
    }
};