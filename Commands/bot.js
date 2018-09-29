/*
*
*   Things to add to rb!bot:
* ----------------------------
*  Add more stats in the future.
*
*/

const Discord = require("discord.js");
const client = new Discord.Client();

const prefix_file = require("../Database/prefix.json");

exports.run = async (client, message) => {
    if(message.content.toLowerCase() == prefix_file.prefix + "bot help"){
        return message.channel.send("**rb!bot help:**\n\n`rb!bot` tells information about Roast-Bot. The information includes: Bot name, created on , Roast-Bot server count, total number of roasts, and total number of memes.\n\nExample:\n\nUSER: rb!bot\nRoast-Bot:\nBot Information:\n\nBot Name:\nRoast-Bot\nCreated On:\nWed Jun 27 2018 02:44:49 GMT+0000 (UTC)\nServer Count:\n328\nTotal Number of Roasts:\n100\nTotal Number of Memes:\n131\n\nCreated By Ole113#2421\n\n\nNote: Stats are from 08/26/2018 and are not current, use rb!bot for current stats.")
    }
    if (message.content.toLowerCase() == prefix_file.prefix + "bot") {
        let bot_icon = client.user.displayAvatarURL;
        let bot_embed = new Discord.RichEmbed()
            .setColor("#EB671D")
            .setTitle("<:roast_circle:474755210485563404> Bot Information:")
            .addBlankField()
            .setThumbnail(bot_icon)
            .addField("Bot Name:", client.user.username)
            .addField("Created On:", client.user.createdAt)
            .addField("Server Count:", client.guilds.size)
            .addField("Total Number of Roasts:", "100", true)
            .addField("Total Number of Memes:", "181", true)
            //.addField("Total Users:", )
            .setFooter("Created By Ole113#2421");
        return message.channel.send({embed: bot_embed});
    }
}