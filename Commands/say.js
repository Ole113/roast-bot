/*
*
*   Things to add to r!say:
* ----------------------------
* 
*/

const Discord = require("discord.js");

exports.run = async (message) => {
    if (message.author.bot) return;
    if(message.content.toLowerCase() == "rb!say" || message.content.toLowerCase() == "r!say  "){
        return message.channel.send("Please provide what you want Roast-Bot to say. The correct usage is `r!say whatToSay`. ");
    }
    if(message.content.toLowerCase() == "rb!say help") {
        return message.channel.send("coming soon");
    }
    if (message.content.toLowerCase().startsWith("rb!say ")) {
        const word = message.content;
        const say = word.slice(6, word.length);
        return message.channel.send(say);
    }
}