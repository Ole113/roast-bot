const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Make the bot say whatever you want!')
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('What should the bot say?')
                .setRequired(true)
            ),
            async execute(interaction) {

                // Shady work-around to avoid having to send a reply but also avoid the "interaction didn't respond" message.
                await interaction.reply("if you can read this you're extremely fast and i'm fascinated by your fast reading skills!");
                await interaction.deleteReply();

                message = interaction.options.getString('message')
                try {
                    return await interaction.channel.send(message)
                } catch (err) {
                    console.error(err)

                    // Error code 50013 is Missing permissions to channel
                    if (err.code == 50013) {
                        return await interaction.user.send(`Whoops. it looks like i'm unable to send messages in: ${interaction.guild.name} > #${interaction.channel.name}`)
                    }
                }
            },
};