const Discord = require("discord.js");

exports.run = async (client, message) => {
    if (message.author.bot) { return; }

    if (message.content.toLowerCase().startsWith(`r!updates`)) {
            let updatesIcon = client.user.displayAvatarURL;
            let updatesEmbed = new Discord.MessageEmbed()
                .setColor("#EB671D")
                .setTitle("<:roast_circle:474755210485563404> Bot Information:")
                .addBlankField()
                .setThumbnail(updatesIcon)
                .addField("Memes:", "**200** more memes added!")
                .addField("XP/Level", "`r!level` shows your level and XP, `r!level @person` shows persons XP and Level.")
                .addField("Search Roasts", "Search keywords in roasts with `r!search whatToSearch`")
                .addField("r!user Update", "r!user now shows XP and level of people.")
                .addField("Leaderboard Command", "see who has the highest XP with `r!server leaderboard` or `r!global leaderboard`");
            return message.channel.send({ embed: updatesEmbed });
    }

};
