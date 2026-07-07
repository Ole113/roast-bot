const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { version } = require("../../package.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Get a link to invite Roast bot to your server!"),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor("#EB671D")
            .setTitle("Invite Link  <:roast_circle:474755210485563404>")
            .setURL("https://discordapp.com/oauth2/authorize?client_id=461361233644355595&scope=bot&permissions=8")
            .setFooter({ text: `Roast Bot Version: ${version}` });

        return await interaction.reply({ embeds: [embed] });
    }
};