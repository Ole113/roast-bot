const Discord = require("discord.js");

const connection = require("../dbConnect.js");
const prefixFile = require("../database/customPrefix/customPrefix.js");
const roastFile = require("./roast.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }

    connection.query(`SELECT * FROM roast_bot_on_off WHERE guildID = "${message.guild.id}";`, function (err, result) {
        if (!result.length) {
            connection.query(`INSERT INTO roast_bot_on_off (guildID, username, _clear, bot, meme, roast, say, _server, urban, user, vid) VALUES ("${message.guild.id}", "${message.author.username}", "${1}", "${1}", "${1}", "${1}", "${1}", "${1}", "${1}", "${1}", "${1}");`, function (err, result) {
                if (err) console.log(err);
            });
        } else {
            let roastStatus = result[0].roast;
            if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}search`) && !roastStatus) {
                return message.channel.send("You cannot search roasts because the Roast command has been turned off by an administrator.");
            } else if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}search `)) {
                let searchParam = message.content.slice(prefixFile.prefix.length + 7, message.content.length);
                let found = ""
                let totalLength = 0;
                for (let i = 0; i < roastFile.roasts.length; i++) {
                    if (roastFile.roasts[i].roast.includes(searchParam)) {
                        totalLength += roastFile.roasts[i].roast.length;
                        found += roastFile.roasts[i].roast + "\n";
                    }
                }
                if (totalLength > 2000) {
                    return message.channel.send(`There were too many roasts found that have *${searchParam}* in them, try being more specific.`);
                }
                return message.channel.send(`**Results:** \n\n${found}`);
            }
        }
    });
};