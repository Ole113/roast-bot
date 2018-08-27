/*
*
*   Things to add to r!invite:
* ----------------------------
* 
*/

const Discord = require("discord.js");

exports.run = async (message) => {
    if(message.content == "r!invite help"){
        return message.channel.send("**r!invite help:**\n\nIf you love using Roast-Bot you can invite it with a simple invite link.  If you click on blue text that says \"Invite Link\" you will be redirected to a page where you can invite Roast-Bot!\n\n*Example:\n\n*USER: r!invite\nRoast-Bot:         Invite Link\n**Roast-Bot v1.9.0**\n\nIf you put 1 or more spaces after `r!invite` the command will still work. It will however not work if you put 1 or more spaces after the “server” and then a character that isn’t a space.")
    }
if(message.content == "r!invite") {
    let invite_embed = new Discord.RichEmbed()
        .setColor("#EB671D")
        .setTitle("Invite Link  <:roast_circle:474755210485563404>")
        .setURL("https://discordapp.com/oauth2/authorize?client_id=461361233644355595&scope=bot&permissions=8")
        .setFooter("Roast-Bot v1.9.0");
    return message.channel.send(invite_embed);
    }
}