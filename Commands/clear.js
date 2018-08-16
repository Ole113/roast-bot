/*
*
*   Things to add to r!clear:
* ----------------------------
*  NEED TO TEST: Make it so it deletes the exact number of messages.
*
*/

const Discord = require("discord.js");

exports.run = async (message, int) => {
    const word = message.content;
	const number = word.slice(7, word.length);
	const int = Number(number);
    if (message.content.startsWith("r!clear")) {
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("Roast-Bot needs to be given Manage Messages permissions to use this command :( <:roast_circle:474755210485563404>");
        } else if (int >= 100) {
            return message.channel.send("The max number of messages you can delete is 100 :( <:roast_circle:474755210485563404>");
        } else if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("Looks like you dont have the permissions to do that :( <:roast_circle:474755210485563404>");
        } else if (int == "" || int == " ") {
            return message.channel.send("Incorrect usage of r!clear, please provide how many messages you want to be deleted. The correct usage is r!clear NUMBER. <:roast_circle:474755210485563404>");
        }
        message.channel.bulkDelete(int).then(() => {
            return message.channel.send(`Cleared ${int} messages. <:roast_circle:474755210485563404>`)
        });
    }
}