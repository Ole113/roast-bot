const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: SlashCommandBuilder()
        .setName('r_say')
        .setDescription('Make the bot say whatever you want!')
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('What should the bot say?')
                .setRequired(true)
            ),
            async execute(interaction) {
                // Again no need to keep the initial interaction.
                await interaction.deleteReply();
                message = interaction.options.getString('message')
                return await interaction.message.channel.send(message)
            },
};