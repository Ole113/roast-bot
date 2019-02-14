/*
*
*   Things to add to rb!updates:
* ----------------------------
* Maybe a better command name?
*
*/

const Discord = require("discord.js");

const prefixFile = require("../database/customPrefix/customPrefix.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }

    if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}updates`)) {
            let updatesIcon = client.user.displayAvatarURL;
            let updatesEmbed = new Discord.RichEmbed()
                .setColor("#EB671D")
                .setTitle("<:roast_circle:474755210485563404> Bot Information:")
                .addBlankField()
                .setThumbnail(updatesIcon)
                .addField("Memes:", "**200** more memes added!")
                .addField("XP/Level", "`rb!level` shows your level and XP, `rb!level @person` shows persons XP and Level.")
                .addField("Search Roasts", "Search keywords in roasts with `rb!search whatToSearch`")
                .addField("rb!user Update", "rb!user now shows XP and level of people.")
                .addField("Leaderboard Command", "see who has the highest XP with `rb!server leaderboard` or `rb!global leaderboard`");
            return message.channel.send({ embed: updatesEmbed });
    }
}