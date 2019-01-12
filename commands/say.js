/*
*
*   Things to add to rb!say:
* ----------------------------
* 
*/

const Discord = require("discord.js");

const { prefixFile } = require("../Database/custom-prefix.js");
const { onOff } = require("../Database/on-off.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }

    const key = message.guild.id;

    if(message.content.toLowerCase() === prefixFile.get(key, "prefix") + "say" || message.content.toLowerCase() === prefixFile.get(key, "prefix") + "say  "){
        return message.channel.send("Please provide what you want Roast-Bot to say. The correct usage is `rb!say whatToSay`. ");
    }
   if(message.content.toLowerCase() === prefixFile.get(key, "prefix") + "say help") {
        return message.channel.send("**rb!say help:**\n\nTo use `rb!say whatToSay` \"whatToSay\" is want you want the bot to say.\n\n*Example:*\n\nUSER: rb!say Hello!\nRoast-Bot: Hello!\n\nIf you accidentally use `rb!say` with one or more spaces after rb!say without saying what you want Roast-Bot to say, Roast-Bot will return a warning of \"Please provide what you want Roast-Bot to say. The correct usage is `rb!say whatToSay`.\"\n\nStill having trouble with rb!meme or have a suggestion? Join the support server:\nhttps://discordapp.com/invite/9y8yV42");
    }
    if (message.content.toLowerCase().startsWith(prefixFile.get(key, "prefix") + "say ") && onOff.get(key, "say") === "on") {
        const word = message.content;
        const say = word.slice(prefixFile.get(key, "prefix").length + 4, word.length);
        return message.channel.send(say);
    } else if(message.content.toLowerCase().startsWith(prefixFile.get(key, "prefix") + "say ") && onOff.get(key, "say") === "off") {
        return message.channel.send("This command has been turned off by an administrator.");      
    }
};