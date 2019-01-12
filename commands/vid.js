/*
*
*   Things to add to rb!invite:
* ----------------------------
* 
*/

const Discord = require("discord.js");

const { prefixFile } = require("../database/custom-prefix.js");
const { onOff } = require("../database/on-off.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }

    const key = message.guild.id;

    if (message.content.toLowerCase() === prefixFile.get(key, "prefix") + "vid help") {
        return message.channel.send("coming soon");
    }
    if (message.content.toLowerCase() === prefixFile.get(key, "prefix") + "vid" && onOff.get(key, "vid") === "on") {
        let randomNumber = Math.floor(Math.random() * 7 + 1);
        return message.channel.send(`Video #${randomNumber} <:roast_circle:474755210485563404>`, { files: [`Videos/vid${randomNumber}.gif`] });
    } else if(message.content.toLowerCase() === prefixFile.get(key, "prefix") + "vid" && onOff.get(key, "vid") === "off") {
        return message.channel.send("This command has been turned off by an administrator.");      
    }
    if (message.content.startsWith(prefixFile.get(key, "prefix") + "vid #") && onOff.get(key, "vid") === "on") {
        let content = message.content;
        let vidNumber = content.slice(prefixFile.get(key, "prefix").length + 5, content.length);
        let vidNumberInt = parseInt(vidNumber);
        if(vidNumberInt > 7 || vidNumberInt <= 0) {
            return message.channel.send("Sorry that video couldn't be found. <:roast_circle:474755210485563404>");
        }
        return message.channel.send(`Video #${vidNumberInt} <:roast_circle:474755210485563404>`, { files: [`Videos/vid${vidNumberInt}.gif`] });
    } else if(message.content.toLowerCase().startsWith(prefixFile.get(key, "prefix") + "vid #") && onOff.get(key, "vid") === "off") {
        return message.channel.send("This command has been turned off by an administrator.");   
    }
};