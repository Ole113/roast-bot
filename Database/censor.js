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

        roastFile[43].roast = "I failed a spelling test because they asked me how to spell 'b*tch' and I wrote down your name.";
        roastFile[92].roast = "You must\'ve been born at a pound because your a son of a b*tch.";
        roastFile[92].roast = "What did you have for breakfast? B*tch Flakes?";
        roastFile[132].roast = "If I wanted a bitch I'd have bought a dog.";

        return message.channel.send(roastFile[43].roast);
        //return message.channel.send(`Censoring has been applied. ${roastFile[43].roast}`);
    } else if (message.content.toLowerCase().startsWith(prefixFile.prefix + "censor") && onOffFile.censor == "off") {
        return message.channel.send("This command has been turned off by an administrator.");
    }
}