/*
*
*   Things to add to r!server:
* ----------------------------
*  Add more stats.
*
*/

const Discord = require("discord.js");

exports.run = async (message) => {
    let server_icon = message.guild.iconURL;
    let server_embed = new Discord.RichEmbed()
        .setColor("#EB671D")
        .setTitle("Server Information:")
        .addBlankField()
        .setThumbnail(server_icon)
        .addField("Server Name:", message.guild.name)
        .addField("Created On:", message.guild.createdAt)
        .addField("You Joined:", message.member.joinedAt)
        .addField("Total Members:", message.guild.memberCount);
    return message.channel.send(server_embed);
}