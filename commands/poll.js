/*
*
*   Things to add to r!poll:
* ----------------------------
*
*/

const Discord = require("discord.js");

const { prefixFile } = require("../database/custom-prefix.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }

    const key = message.guild.id;
    const prefix = String(prefixFile.get(key, "prefix"));
    
    if (!prefixFile.has(key)) {
	    prefixFile.set(key, message.guild.id, "guild");
    }
    if (message.content.toLowerCase().startsWith(prefix + "poll")) {
        return message.channel.send("coming soon");
    }
};
