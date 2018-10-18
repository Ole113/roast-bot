/*
*
*   Things to add to rb!invite:
* ----------------------------
* 
*/

const Discord = require("discord.js");

const prefixFile = require("../Database/prefix.json");
const onOffFile = require("../Database/on-off.json");

exports.run = async (message) => {
    if (message.author.bot) return;
    if (message.content.toLowerCase() == prefixFile.prefix + "vid help") {
        return message.channel.send("coming soon");
    }
    if (message.content.toLowerCase() == prefixFile.prefix + "vid" && onOffFile.vid == "on") {
        let randomNumber = Math.floor(Math.random() * 7 + 1);
        return message.channel.send(`Video #${randomNumber} <:roast_circle:474755210485563404>`, { files: [`Videos/vid${randomNumber}.gif`] });
    } else if(message.content.toLowerCase() == prefixFile.prefix + "vid" && onOffFile.vid == "off") {
        return message.channel.send("This command has been turned off.");   
    }
    if (message.content.startsWith(prefixFile.prefix + "vid #") && onOffFile.vid == "on") {
        let content = message.content;
        let vidNumber = content.slice(prefixFile.prefix.length + 5, content.length);
        let vidNumberInt = parseInt(vidNumber);
        if(vidNumberInt > 7 || vidNumberInt <= 0) {
            return message.channel.send("Sorry that video couldn't be found. <:roast_circle:474755210485563404>");
        }
        return message.channel.send(`Video #${vidNumberInt} <:roast_circle:474755210485563404>`, { files: [`Videos/vid${vidNumberInt}.gif`] });
    } else if(message.content.toLowerCase().startsWith(prefixFile.prefix + "vid #") && onOffFile.vid == "off") {
        return message.channel.send("This command has been turned off.");
    }
}