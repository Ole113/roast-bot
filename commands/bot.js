const { SlashCommandBuilder, MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('r_bot')
        .setDescription('tells information about Roast-Bot. The information includes: Bot name, created on , Roast-Bot server count, total number of roasts, and total number of memes.'),
        async execute(interaction) {

            // Simply create a embed and reply to the command with the given embed.
            let icon = interaction.Client.user.displayAvatarURL;
            let embed = new MessageEmbed()
                .setColor("#EB671D")
                .setTitle("<:roast_circle:474755210485563404> Bot Information:")
                .addBlankField()
                .setThumbnail(icon)
                .addField("Bot Name:", client.user.username)
                .addField("Created On:", client.user.createdAt)
                .addField("Total Number of Roasts:", "135", true)
                .addField("Total Number of Memes:", "536", true)
                .addField("Website:", "http://roast-bot.com", true)
                .addField("Number of Commands:", "14")
                .setFooter("Created By Ole113#2421");
            return await interaction.reply({embeds: embed});
        },
};