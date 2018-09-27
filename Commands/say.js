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
   if(message.content.toLowerCase() == "r!say help") {
    return message.channel.send("**r!say help:**\n\nTo use `r!say whatToSay` “whatToSay” is want you want the bot to say.\n\n*Example:*\n\nUSER: r!say Hello!\nRoast-Bot: Hello!\n\nIf you accidentally use `r!say` with one or more spaces after r!say without saying what you want Roast-Bot to say, Roast-Bot will return a warning of “Please provide what you want Roast-Bot to say. The correct usage is `r!say whatToSay`.”\n\nStill having trouble with r!meme or have a suggestion? Join the support server:\nhttps://discordapp.com/invite/9y8yV42");
}

    if (message.content.toLowerCase().startsWith("rb!say ")) {
        const word = message.content;
        const say = word.slice(6, word.length);
        return message.channel.send(say);
    }
}