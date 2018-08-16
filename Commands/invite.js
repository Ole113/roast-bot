/*
*
*   Things to add to r!invite:
* ----------------------------
* 
*/

const Discord = require("discord.js");

exports.run = async (message) => {
    if(message.content == "r!invite") {
    let invite_embed = new Discord.RichEmbed()
        .setColor("#EB671D")
        .setTitle("***Invite Link***  <:roast_circle:474755210485563404>")
        .setURL("https://discordapp.com/oauth2/authorize?client_id=461361233644355595&scope=bot&permissions=8")
        .setFooter("Roast-Bot v1.9.0");
    return message.channel.send(invite_embed);
    }
}