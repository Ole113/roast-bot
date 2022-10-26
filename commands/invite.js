const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('r_invite')
    .setDescription('Retrieve a link to invite Roast bot to your server!'),
    async execute(interaction) {

        // Simply create a embed and reply to the command with the given embed.
        let embed = new Discord.MessageEmbed()
        .setColor("#EB671D")
        .setTitle("Invite Link  <:roast_circle:474755210485563404>")
        .setURL("https://discordapp.com/oauth2/authorize?client_id=461361233644355595&scope=bot&permissions=8")
        .setFooter("Roast-Bot v3.0.0");
        return await interaction.reply({embeds: [embed]});
    },
};