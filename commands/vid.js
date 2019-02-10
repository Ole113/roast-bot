/*
*
*   Things to add to r!invite:
* ----------------------------
* 
*/

const Discord = require("discord.js");

const connection = require("../dbConnect.js");
const prefixFile = require("../database/customPrefix/customPrefix.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }
    if (message.content.toLowerCase().startsWith(prefixFile.prefix || "r!")) {

        connection.query(`SELECT * FROM roast_bot_on_off WHERE guildID = "${message.guild.id}";`, function (err, result) {
            let update;

            let vidStatus = result[0].vid;
            if ((message.content.toLowerCase().startsWith(`${prefixFile.prefix}vid on`) || message.content.toLowerCase().startsWith(`${prefixFile.prefix}vid off`)) && !message.member.hasPermission("ADMINISTRATOR")) {
                return message.channel.send("You need to be an admin to turn this command on/off.");
            } else if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}vid on`)) {
                if (err) console.log(err);

                if (result[0].vid) {
                    return message.channel.send(`This command is already on, use *${prefixFile.prefix}vid off* to turn it off.`);
                } else if (!result[0].vid) {
                    update = `UPDATE roast_bot_on_off SET username = "${message.author.username}", vid = "${1}" WHERE guildID = "${message.guild.id}";`;
                    updateVid();
                    return message.channel.send(`Vid command has been turned on, use *${prefixFile.prefix}vid off* to turn it back off.`);
                }
            } else if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}vid off`)) {
                if (err) console.log(err);

                if (!result[0].vid) {
                    return message.channel.send(`This command is already off, use *${prefixFile.prefix}vid on* to turn it on.`)
                } else if (result[0].vid) {
                    update = `UPDATE roast_bot_on_off SET username = "${message.author.username}", vid = "${0}" WHERE guildID = "${message.guild.id}";`;
                    updateVid();
                    return message.channel.send(`Vid command has been turned off, use *${prefixFile.prefix}vid on* to turn it back on.`);
                }
            }
            function updateVid() {
                connection.query(update, function (err, result) {
                    if (err) console.log(err);
                });
            }
            if (message.content.toLowerCase() === `${prefixFile.prefix}vid help`) {
                return message.channel.send("coming soon");
            }
            if (message.content.toLowerCase() === `${prefixFile.prefix}vid` && vidStatus) {
                let randomNumber = Math.floor(Math.random() * 7 + 1);
                return message.channel.send(`Video #${randomNumber} <:roast_circle:474755210485563404>`, { files: [`videos/vid${randomNumber}.gif`] });
            } else if (message.content.toLowerCase() === `${prefixFile.prefix}vid`) {
                return message.channel.send("This command has been turned off by an administrator.");
            }
            if (message.content.startsWith(`${prefixFile.prefix}vid #`) && vidStatus) {
                let vidNumber = message.content.slice(prefixFile.prefix.length + 5, message.content.length);
                let vidNumberInt = parseInt(vidNumber);
                if (vidNumberInt > 7 || vidNumberInt <= 0) {
                    return message.channel.send("Sorry that video couldn't be found. <:roast_circle:474755210485563404>");
                }
                return message.channel.send(`Video #${vidNumberInt} <:roast_circle:474755210485563404>`, { files: [`videos/vid${vidNumberInt}.gif`] });
            } else if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}vid`) && !vidStatus) {
                return message.channel.send("This command has been turned off by an administrator.");
            }
        });
    }
};