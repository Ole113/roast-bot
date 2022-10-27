/*
 *
 *   Things to add to r!urban:
 * ----------------------------
 *  Remove brackets with message.content.replace(whatever the syntax is);
 *  Make it so if the word is not found it will only say Word not found and wont send the other info of undefined.
 */

const urban = require("relevant-urban");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Look something up in urban dictionary')
        .addStringOption(option =>
            option
                .setName('word')
                .setDescription('The world to look for.')
                .setRequired(true)
                ),
        async execute(interaction) {
            
            // Retrieval of the urban word.
            const res = await urban(interaction.options.getString('word')).catch(e => {
                return interaction.reply("Word not found. <:roast_circle:474755210485563404>");
            });

            const embed = new EmbedBuilder()
                .setColor("#EB671D")
                .setTitle(res.word)
                .setURL(res.urbanURL)
                .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n${res.example}`)
                .addFields(
                    {name: 'Author:', value: res.author},
                    {name: 'Ratings:', value: `**Upvotes: :thumbsup:** ${res.thumbsUp} | **Downvotes: :thumbsdown:** ${res.thumbsDown}`}
                );
            return await interaction.reply({embeds: [embed]});
        }
}