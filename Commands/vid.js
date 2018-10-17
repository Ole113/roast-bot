 /*
*
*   Things to add to rb!invite:
* ----------------------------
* 
*/
 
const Discord = require("discord.js");
 
const prefixFile = require("../Database/prefix.json");
 
exports.run = async (message) => {
    if (message.author.bot) return;
    if(message.content.toLowerCase() == prefixFile.prefix + "vid help"){
        return message.channel.send("coming soon");
    }
if(message.content.toLowerCase() == prefixFile.prefix + "vid") {
    return message.channel.send("../vid1.gif");
}