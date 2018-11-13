const Discord = require("discord.js");

const { prefixFile } = require("../Database/custom-prefix.js");

exports.run = async (message) => {
    if(message.content.toLowerCase().startsWith(prefixFile.get(key, "prefix") + "website help")) {
        return message.channel.send("Coming soon!");
    }
    if (message.content.toLowerCase().startsWith(prefixFile.get(key, "prefix") + "website")) {
        let websiteEmbed = new Discord.RichEmbed()
            .setColor("#EB671D")
            .setTitle("roast-bot.com  <:roast_circle:474755210485563404>")
            .setURL("http://www.roast-bot.com")
            .setFooter("Roast-Bot v2.2.0");
        return message.channel.send({ embed: websiteEmbed });
    }
}