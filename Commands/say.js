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
        if(say === " " || say === ""){
           return message.channel.send("Please provide what you want Roast-Bot to say.");
        }
        return message.channel.send(say);
    }
}