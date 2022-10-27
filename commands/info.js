// Import of different informations
const fs = require('node:fs');
const path = require('node:path');
const { version } = require('../package.json');
const roasts = require('../roasts.json');


const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const roast_amount = String(roasts.length);
const meme_amount  = String(fs.readdirSync(path.join(__dirname, '../images')).length);


module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Gives information about the bot.'),
        async execute(interaction) {

            // Simply create a embed and reply to the command with the given embed.
                const icon = interaction.client.user.avatarURL();
                const embed = new EmbedBuilder()
                    .setColor("#EB671D")
                    .setTitle("<:roast_circle:474755210485563404> Bot Information:")
                    .setDescription("Information about Roast bot")
                    .setThumbnail(icon)
                    .addFields(
                        { name: "Bot Name:", value: interaction.client.user.username },
                        { name: "Created On:", value: interaction.client.user.createdAt.toISOString().split('T')[0]},
                        { name: "Version: ", value: version},
                        { name: "Number of Roasts: ", value: roast_amount},
                        { name: "Number of Memes: ", value: meme_amount},
                        { name: "Number of Commands:", value: "14"}
                        )
                    .setFooter({ text: "Created by Ole113#2421 Rewritten by ElHeroLeGoat#9561" });
                return await interaction.reply({embeds: [embed]});
        },
};