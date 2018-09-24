/*
*
*   Things to add to r!meme:
* ----------------------------
*
*/

const Discord = require("discord.js");

exports.run = async (message) => {
    if(message.content.toLowerCase() == "rb!user") {

        if(member.user.premium == true) {
            return message.channel.send("Has Nitro");
        } else {
            return message.channel.send("No Nitro");
        }
        /*
        let user_embed = new Discord.RichEmbed()
        .setColor("#EB671D")
        .setTitle(message.user);
        */
    }
}