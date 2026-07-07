const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Make Roast Bot say something!")
        .addStringOption(option =>
            option
                .setName("message")
                .setDescription("What should Roast Bot say?")
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const message = interaction.options.getString("message");
            
            return await interaction.reply(message);
        }
        catch {
            return await interaction.reply("Either the message was too long or something else went wrong. <:roast_circle:474755210485563404>");
        }
    }
};