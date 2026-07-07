const urban = require("relevant-urban");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("urban")
        .setDescription("Look something up in Urban Dictionary!")
        .addStringOption(option =>
            option
                .setName("word")
                .setDescription("The word to look for.")
                .setRequired(true)
        ),
    async execute(interaction) {

        try {
            // Get the word from the Urban Dictionary API
            const urbanRes = await urban(interaction.options.getString("word")).catch(async error => {
                console.error(`urban.js:17 [ERROR]: ${error}`);
                return await interaction.reply("Word not found. <:roast_circle:474755210485563404>");
            });

            // For some reason if the word is undefined the embed object is still built, this checks and returns before that happens
            if (!urbanRes.word) return;

            const embed = new EmbedBuilder()
                .setColor("#EB671D")
                .setTitle(urbanRes.word)
                .setURL(urbanRes.urbanURL)
                .setDescription(`**Definition:**\n*${urbanRes.definition.replaceAll("[", "").replaceAll("]", "")}*`)
                .addFields(
                    { name: "Example:", value: `*${urbanRes.example.replaceAll("[", "").replaceAll("]", "")}*` },
                    { name: "Author:", value: urbanRes.author },
                    { name: "Ratings:", value: `**Upvotes: :thumbsup:** ${urbanRes.thumbsUp} | **Downvotes: :thumbsdown:** ${urbanRes.thumbsDown}` }
                );

            return await interaction.reply({ embeds: [embed] });
        }
        catch {
            return await interaction.reply("Invalid input. <:roast_circle:474755210485563404>");
        }
    }
}