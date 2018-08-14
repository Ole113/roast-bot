/*
*
*   Things to add to r!help:
* ----------------------------
*
*/

const Discord = require("discord.js");

exports.run = async (client, message) => {
    let help_icon = client.user.displayAvatarURL;
    let help_embed = new Discord.RichEmbed()
        .setColor("#EB671D")
        .setTitle("Roast-Bot Help:")
        .addBlankField()
        .setThumbnail(help_icon)
        .addField("***Commands:***\n\nr!help", "List of Roast-Bot Commands.")
        .addField("r!bot", "Learn more about Roast-Bot.")
        .addField("r!roast *@USER*, r!roast, or r!roast *#roastNumber*", "Generate a random roast with the number of roast it was.")
        .addField("r!invite", "Link to invite Roast-Bot to a server.")
        .addField("r!server", "Info about your server.")
        .addField("r!meme, or r!meme *#memeNumber*", "Sends a meme to the current channel.")
        .addField("r!clear *NUMBER*", "Choose how many messages you want to delete. Max is 100. **To use this command Roast-Bot needs to given Manage Messages permissions.**")
        .addField("r!say", "To use this command use `r!say ` and then what you want Roast-Bot to say.")
        .addField("r!urban *whatToSearch*", "Search up anything on the Urban Dictionary! **Please be aware `r!urban` is still in Beta.**")
        .addBlankField()
        .addField("***Utilities:***\n\nwelcome-leave-log:", "To use the Roast-Bot welcome-leave-log make a channel named \"welcome-leave-log\". If you don't want to use the log just don't make a channel named welcome-leave-log.")
        //.addField("XP-System", "Everytime you use a Roast-Bot command your XP increases! Use r!level to check your level and XP! **r!level is in BETA** Level 1: 0-9XP, Level 2: 10XP, Level 3: 15XP, Level 4: 25XP Level 5: 50XP, Level 6: 100XP, Level 7: 200XP, Level 8: 500XP, Level 9: 1,000XP, Level 10: 10,000XP")
        .addBlankField()
        .addField("Roast-Bot Development Server:", "If you still need help, have any questions or feedback join the Roast-Bot help server. \n \n https://discord.gg/fuDF42D")
        .setFooter("v1.8.9, for release notes join the Roast-Bot help server. ");
    return message.channel.send(help_embed);
}