const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("r_clear")
        .setDescription('Clears the current channel for X amount of messages.')
        .addIntegerOption(option => 
            option
                .setName('amount')
                .setDescription('The amount of messages to clear')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDMPermission(false),
        async execute(interaction) {
            // Fail-quick ideology, if we don't have the required permission there's not need to continue.
            if (!interaction.Client.user.hasPermission(PermissionFlagsBits.ManageMessages)) {
                return await interaction.reply({content: `Roast-Bot needs to be given Manage Messages permissions to use this command :( <:roast_circle:474755210485563404>`, ephemeral: true})
            }

            // we need the amount of messages to delete, and also need to defer to prevent the interaction from failing.
            const amount = interaction.options.getInteger('amount');
            await interaction.deferReply({ephemeral: true});

            // after we've bulk deleted we gotta send a confirmation to the user.
            await interaction.channel.bulkDelete(amount).then(() => {
                return interaction.editReply({ content: `Cleared ${amount} messages. <:roast_circle:474755210485563404>`, ephemeral: true });
            });
        },
};