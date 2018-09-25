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

        if(message.content.toLowerCase().startsWith("rb!user ")) {
            return message.channel.send(message.mentions.first().id);
        }
        var status = "default";
        switch(message.author.presence.status) {
            case "online":
                status = "<:online:493891715678339089>  Online";
                break;
            case "offline":
                status = "<:invisible:493897783179214858>  Offline";
                break;
            case "idle":
                status = "<:idle:493892777944285194>  Idle";
                break;
            case "dnd":
                status = "<:dnd:493892741613355008>  Do Not Disturb";
                break;
        }

        var game = 0;
        if(message.author.presence.game == null) {
            game = "None";
        } else {
            game = message.author.presence.game;
        }
        let user_embed = new Discord.RichEmbed()
        .setColor("#EB671D")
        .setTitle(`${message.author.username}'s Stats:`)
        .setThumbnail(message.author.displayAvatarURL)
        .addField("Account created at: ", message.author.createdAt.toString())
        .addField("User Id:", message.author.id)
        .addField("Current Game:", game)
        .addField("Current Presense:", status);

        //return message.channel.send(message.author.createdAt.toString());
        return message.channel.send(user_embed);
    }

    
}
