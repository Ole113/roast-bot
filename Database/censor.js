/*
*
*    Things to add to r!censor:
*  ------------------------------
*
*
*/
const Discord = require("discord.js");

const prefixFile = require("../Database/prefix.json");
const onOffFile = require("../Database/on-off.json");
const { roastFile } = require("../Commands/roast.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }
    if (message.content.toLowerCase().startsWith(prefixFile.prefix + "censor") && onOffFile.censor == "on") {
        
        roastFile[43].roast.replace(/bitch/gi, "b*tch");
        return message.channel.send(`Censoring has been applied. ${roastFile[43].roast}`);
    } else if (message.content.toLowerCase().startsWith(prefixFile.prefix + "censor") && onOffFile.censor == "off") {
        return message.channel.send("This command has been turned off by an administrator.");
    }
}