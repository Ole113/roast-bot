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

        switch(message.author.presence.status) {
            case "online":

        }
        let user_embed = new Discord.RichEmbed()
        .setColor("#EB671D")
        .setTitle(`${message.author.username}'s Stats:`)
        .setThumbnail(message.author.displayAvatarURL)
        .addField("Account created at: ", message.author.createdAt.toString())
        .addField("Current Presense ", function() {
            if(message.author.presence.status == "online") {
                return "<:online:493897919641026590> online";
            }
        });
        //return message.channel.send(message.author.createdAt.toString());
        return message.channel.send(user_embed);
    }

    
}
