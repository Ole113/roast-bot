/*
*
*   Things to add to r!poll:
* ----------------------------
*
*/

const Discord = require("discord.js");

const prefixFile = require("../Database/prefix.json");

exports.run = async (message) => {
    if(message.content.toLowerCase().startsWith(prefixFile.prefix + "poll")) {
        let pollEmbed = new Discord.RichEmbed()
            .setColor("#EB671D")
            .setTitle(`Poll Started by ${message.author}`);
        return message.channel.send({ embed: pollEmbed });
    }
}
