/*
*
*   Things to add to rb!clear:
* ----------------------------
*  NEED TO TEST: Make it so it deletes the exact number of messages.
*  Make it so if someone passes "rb!clear abc" it will give an error AND UPDATE rb!CLEAR HELP DOCS
*/
 
const Discord = require("discord.js");
 
const prefixFile = require("../Database/prefix.json");
const onOffFile = require("../Database/on-off.json");
 
exports.run = async (message) => {
    if(message.content.toLowerCase().startsWith(prefixFile.prefix + "updates")) {
        return message.channel.send("Roast-Bot v2.2.0 - 2018-10-13:\n\n Roast-Bot v2.2.0 is now live, the new features/updates are as follows:\n\n<:roast_circle:474755210485563404> 50 new Memes added!\n<:roast_circle:474755210485563404> r!feedback added, use `r!feedback Feedback` to send feedback. *Note*: you can also send reports of bugs with r!feedback.\n<:roast_circle:474755210485563404> On-Off is live! Use `r!off commandName` to turn commands off and `r!on commamdName` to turn a command back on. *Note*: only admins can turn commands on/off.\n<:roast_circle:474755210485563404> Custom prefix has been fixed, now the only way to change a prefix is by using `r!prefix newPrefix` no matter what your prefix is. *Note*: It has been changed so only admins can set the prefix.");
    }

}