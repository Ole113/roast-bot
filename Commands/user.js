/*
*
*   Things to add to r!meme:
* ----------------------------
*
*/

const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = async (message) => {
    if(message.content.toLowerCase() == "rb!user") {
        return message.channel.send(message.author.createdAt);
    }
        /*
        let user_embed = new Discord.RichEmbed()
        .setColor("#EB671D")
        .setTitle(message.user);
        */
    
}