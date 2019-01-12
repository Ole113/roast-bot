/*
*
*   Things to add to rb!updates:
* ----------------------------
* Maybe a better command name?
*
*/
 
const Discord = require("discord.js");
 
const { prefixFile } = require("../database/custom-prefix.js");
const { onOff } = require("../database/on-off.js");
 
exports.run = async (message) => {
    if (message.author.bot) { return; }

    const key = message.guild.id;

    if(message.content.toLowerCase().startsWith(prefixFile.get(key, "prefix") + "updates")) {
        return message.channel.send("**2018-11-15:**\n\nRoast-Bot v2.3.0 is now live, the new features are:\n\n<:roast_circle:474755210485563404> Almost **150** new Memes!\n<:roast_circle:474755210485563404> 35 new Roasts!\n<:roast_circle:474755210485563404> `r!website` sends the Roast-Bot website.\n<:roast_circle:474755210485563404> `r!updates` sends what was new in the newest update.\n<:roast_circle:474755210485563404> More information added to `r!server`!\n\nFor more information on v2.3.0 send me a DM or ask in #roast-bot-help.");
    }
}