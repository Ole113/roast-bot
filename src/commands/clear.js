const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clears the current channel for a specified amount of messages.")
        .addIntegerOption(option =>
            option
                .setName("amount")
                .setDescription("The amount of messages to clear")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDMPermission(false),
    async execute(interaction) {
        try {

            if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageMessages)) {
                return await interaction.reply({ content: `Roast-Bot needs to be given Manage Messages permissions to use this command. <:roast_circle:474755210485563404>`, ephemeral: true });
            }

            const amount = interaction.options.getInteger("amount");
            await interaction.deferReply({ ephemeral: true });

            await interaction.channel.bulkDelete(amount).then(() => {
                return interaction.followUp({ content: `Cleared ${amount} messages. <:roast_circle:474755210485563404>`, ephemeral: true });
            }).catch(() => {
                return interaction.followUp({ content: `I'm unable to delete messages that are more than 14 days old or something else went wrong. <:roast_circle:474755210485563404>`, ephemeral: true });
            });
        } catch {
            return await interaction.reply("Something went wrong. <:roast_circle:474755210485563404>");
        }
    },
};