const { SlashCommandBuilder } = require("discord.js");
const roasts = require("../roasts.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search-roast')
        .setDescription('Search for a specific roast!')
        .addStringOption(option =>
            option
                .setName('roast')
                .setDescription('The search parameter to look for.')
                .setRequired(true)
                ),
    async execute(interaction) {
        const searchParam = interaction.options.getString('roast');
        
        // A Map function so we're able to retrieve the desired elements.
        function mapFunc(val) {
            if (val.roast.toLowerCase().includes(searchParam.toLowerCase())) {
                return `${val.number}: ${val.roast}`;
            }
        }
        const result = roasts.map(mapFunc).filter(Boolean).join('\n\n').trim();
        const message = `**Found:** \`\`\`${result}\`\`\``;

        // Fail fast > If there's no results just tell em it doesn't exist.
        if (!result) {
           return await interaction.reply(`You looked for: \`${searchParam}\` but there's no roasts containing that, try being less specific.`);
        }
        else if (message.length > 2000) {
            return await interaction.reply(`There were too many roasts found that have \`${searchParam}\` in them, try being more specific.`);
        }
        return await interaction.reply(message);
    }
}