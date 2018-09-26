/*
*
*   Things to add to r!user:
* ----------------------------
*  XP and level and how close they are to the next level.
*/

const Discord = require("discord.js");
const client = new Discord.Client();


exports.run = async (message) => {



if(message.content.toLowerCase().startsWith("rb!user ")) {
        var muser = message.mentions.users;
        
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
    
    muser.forEach(function(user){
        let user_embed = new Discord.RichEmbed()
        .setColor("#EB671D")
        .setTitle(`${user.username}'s Stats:`)
        .setThumbnail(user.displayAvatarURL)
        .addField("Account created at: ", user.createdAt.toString())
        .addField("User Id:", user.id)
        //.addField("Current Game:", game)
        .addField("Bot:", user.bot.toString())
        .addField("Current Presense:", message.mentions.users.presence.status);
        return message.channel.send(user_embed);

    });
} 

if(message.content.toLowerCase() == "rb!user") {

        let user_embed = new Discord.RichEmbed()
        .setColor("#EB671D")
        .setTitle(`${message.author.username}'s Stats:`)
        .setThumbnail(message.author.displayAvatarURL)
        .addField("Account created at: ", message.author.createdAt.toString())
        .addField("User Id:", message.author.id)
        .addField("Current Game:", game)
        .addField("Bot:", message.author.bot)
        .addField("Current Presense:", status);
        return message.channel.send(user_embed);

    }
}
