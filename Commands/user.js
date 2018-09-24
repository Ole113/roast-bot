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

        var status = "default";
        switch(message.author.presence.status) {
            case "online":
                status = "<:online:493897919641026590> <:roast_circle:474755210485563404> Online";
            case "offline":
                status = "<:online:493897919641026590> <:roast_circle:474755210485563404>Offline";
            case "idle":
                status = "Idle";
            case "dnd":
                status = "Do Not Disturb";
        }
        let user_embed = new Discord.RichEmbed()
        .setColor("#EB671D")
        .setTitle(`${message.author.username}'s Stats:`)
        .setThumbnail(message.author.displayAvatarURL)
        .addField("Account created at: ", message.author.createdAt.toString())
        .addField("Current Presense:", status);

        //return message.channel.send(message.author.createdAt.toString());
        return message.channel.send(user_embed);
    }

    
}
