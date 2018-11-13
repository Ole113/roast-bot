/*
*
*   Things to add to r!poll:
* ----------------------------
*
*/

const Discord = require("discord.js");

const { prefixFile } = require("../Database/custom-prefix.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }

    const key = message.guild.id;

    if (message.content.toLowerCase().startsWith(prefixFile.get(key, "prefix") + "poll")) {
        return message.channel.send("coming soon");
    }
};
