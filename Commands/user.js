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

        if(true == true) {
            return message.channel.send(client.user.createdAt);
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