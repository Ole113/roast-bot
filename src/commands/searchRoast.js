const { SlashCommandBuilder } = require("discord.js");
const roasts = require("../../resources/roasts.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roasts")
        .setDescription("Roast someone!")
        .addSubcommand(subcommand =>
            subcommand
                .setName("search")
                .setDescription("Search for a specific roast by keyword or lower/upper range!")
                .addStringOption(option =>
                    option
                        .setName("keyword")
                        .setDescription("The search keyword to look for"))
                .addIntegerOption(option =>
                    option
                        .setName("lower-range")
                        .setDescription("Search for all roasts within this lower range")
                        .setMinValue(1)
                        .setMaxValue(roasts.length))
                .addIntegerOption(option =>
                    option
                        .setName("upper-range")
                        .setDescription("Search for all roasts within this upper range range")
                        .setMinValue(1)
                        .setMaxValue(roasts.length))
        ),
    async execute(interaction) {
        try {

            const keyword = interaction.options.getString("keyword") ?? null;
            const lowerRange = interaction.options.getInteger("lower-range") ?? 1;
            const upperRange = interaction.options.getInteger("upper-range") ?? roasts.length;

            // Checks if the bounds have invalid values
            if (upperRange <= lowerRange || lowerRange >= upperRange) {
                return await interaction.reply("The upper range needs to be more than the lower range and the lower range needs to be less than the upper range.");
            }

            if (lowerRange == null && upperRange == null && keyword == null) {
                return await interaction.reply("Either the keyword, lower range, or upper range needs to be set.");
            }

            // Iterates through the roasts to find ones that are valid by the three filters
            const result = roasts.map((roast) => {
                const roastResult = `\n* ${roast.roast} **Roast #${roast.number}** <:roast_circle:474755210485563404>`;

                if ((lowerRange !== null && roast.number >= lowerRange && upperRange == null) ||
                    (upperRange !== null && roast.number <= upperRange && lowerRange == null) ||
                    (upperRange !== null && lowerRange !== null && roast.number >= lowerRange && roast.number <= upperRange)) {
                    if (keyword == null) {
                        return roastResult;
                    } else if (roast.roast.toLowerCase().includes(keyword.toLowerCase())) {
                        return roastResult;
                    }
                }
            });

            const message = `${result.join("")}\n\n**(${result.join("").split("<:roast_circle:474755210485563404>").length - 1}) Roasts Found!**`;

            // Checks there were no roasts that satisfied the filters
            if (!result.join("")) {
                if (lowerRange !== null || upperRange !== null) {
                    return await interaction.reply(`There are no roasts in that range. Try being *less* specific.`);
                }

                return await interaction.reply(`There are no roasts containing '**${keyword}**'. Try being *less* specific.`);
            }
            // Checks if the returned message is too long to display.
            else if (message.length > 2000) {
                if (keyword == null && (lowerRange !== null || upperRange !== null)) {
                    return await interaction.reply(`There were too many roasts found in that range. Try being *more* specific.`);
                }

                return await interaction.reply(`There were too many roasts found that have '**${keyword}**' in them. Try being *more* specific.`);
            }

            return await interaction.reply(message);
        } catch {
            return await interaction.reply("Something went wrong. <:roast_circle:474755210485563404>");
        }
    }
}