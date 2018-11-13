/*
*
*   Things to add to rb!updates:
* ----------------------------
* Maybe a better command name?
*
*/
 
const Discord = require("discord.js");
 
const { prefixFile } = require("../Database/custom-prefix.js");
const { onOff } = require("../Database/on-off.js");
 
exports.run = async (message) => {
    if (message.author.bot) { return; }

    const key = message.guild.id;

    if(message.content.toLowerCase().startsWith(prefixFile.get(key, "prefix") + "updates")) {
        return message.channel.send("**Roast-Bot v2.2.0 - 2018-10-13:**\n\n<:roast_circle:474755210485563404> 50 new Memes added!\n<:roast_circle:474755210485563404> r!feedback added, use `r!feedback Feedback` to send feedback. *Note*: you can also send reports of bugs with r!feedback.\n<:roast_circle:474755210485563404> On-Off is live! Use `r!off commandName` to turn commands off and `r!on commamdName` to turn a command back on. *Note*: only admins can turn commands on/off.\n<:roast_circle:474755210485563404> Custom prefix has been fixed, now the only way to change a prefix is by using `r!prefix newPrefix` no matter what your prefix is. *Note*: It has been changed so only admins can set the prefix.");
    }

}