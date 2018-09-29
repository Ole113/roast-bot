/*
*
*   Things to add to rb!help:
* ----------------------------
*
*/

const Discord = require("discord.js");

exports.run = async (client, message) => {
    if (message.content.toLowerCase() == prefix_file.prefix + "help") {
        let help_icon = client.user.displayAvatarURL;
        let help_embed = new Discord.RichEmbed()
            .setColor("#EB671D")
            .setTitle("Roast-Bot Help:")
            .addBlankField()
            .setThumbnail(help_icon)
            .addField("***Commands:***\n\nrb!help", "List of Roast-Bot Commands.")
            .addField("rb!bot", "Learn more about Roast-Bot.")
            .addField("rb!roast *@user*, rb!roast, or rb!roast *roastNumber*", "Generate a random roast with the number of roast it was.")
            .addField("rb!invite", "Link to invite Roast-Bot to a server.")
            .addField("rb!server", "Info about your server.")
            .addField("rb!meme, or rb!meme *memeNumber*", "Sends a meme to the current channel.")
            .addField("rb!clear *NUMBER*", "Choose how many messages you want to delete. Max is 100. **To use this command Roast-Bot needs to given Manage Messages permissions.**")
            .addField("rb!say", "To use this command use `rb!say ` and then what you want Roast-Bot to say.")
            .addField("rb!urban *whatToSearch*", "Search up anything on the Urban Dictionary! **Please be aware `rb!urban` is still in Beta.**")
	    .addField("rb!level", "Check out your current level and XP with rb!level!")
	    .addField("rb!user, or rb!user *@user*", "rb!user returns stats about you, or the person you tagged. The stats include: current presence, user id, current game, when their account was created and more!")
            .addBlankField()
            .addField("***Utilities:***\n\nXP-System", "Everytime you use a Roast-Bot command your XP increases! Use rb!level to check your level and XP! Level 1: 0-9XP, Level 2: 10XP, Level 3: 15XP, Level 4: 25XP Level 5: 50XP, Level 6: 100XP, Level 7: 200XP, Level 8: 500XP, Level 9: 1,000XP, Level 10: 10,000XP")
            .addBlankField()
	    .addField("***Command Help:***", "If your still having trouble using a command you can use `rb!<commandName> help` for more detailed help. If you still don't understand please join the support server.")
            .addBlankField()
	    .addField("Roast-Bot Development Server:", "If you still need help, have any questions or feedback join the Roast-Bot help server. \n \n https://discord.gg/fuDF42D \n\n")
            .setFooter("v2.3.0, for release notes join the Roast-Bot help server. ");
        return message.channel.send({embed: help_embed});
    }
}