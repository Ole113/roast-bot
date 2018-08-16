/*
*
*   Things to add to r!say:
* ----------------------------
* 
*/

const Discord = require("discord.js");

exports.run = async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith("r!say ")) {
        const word = message.content;
        const say = word.slice(6, word.length);
        return message.channel.send(say);
    }
}