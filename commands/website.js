const Discord = require("discord.js");

const { prefixFile } = require("../database/custom-prefix.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }

    const key = message.guild.id;

    if(message.content.toLowerCase().startsWith(prefixFile.get(key, "prefix") + "website help")) {
        return message.channel.send("Coming soon!");
    }
    if (message.content.toLowerCase().startsWith(prefixFile.get(key, "prefix") + "website")) {
        let websiteEmbed = new Discord.RichEmbed()
            .setColor("#EB671D")
            .setTitle("roast-bot.com  <:roast_circle:474755210485563404>")
            .setURL("http://www.roast-bot.com")
            .setFooter("Roast-Bot v2.3.0");
        return message.channel.send({ embed: websiteEmbed });
    }
}