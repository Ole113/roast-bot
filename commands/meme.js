/*
*
*   Things to add to r!meme:
* ----------------------------
*
*/
const { SlashCommandBuilder } = require("discord.js");

// Easy to edit the MemeAmount.
const MemeAmount = 536

module.exports = {
    data: new SlashCommandBuilder()
        .setName('r_meme')
        .setDescription('Send a meme to the channel.')
        .addIntegerOption(option =>
            option 
                .setName('number')
                .setDescription('Pick a number between 1 and 536')
                .setMinValue(0)
                .setMaxValue(MemeAmount)
        ),
        async execute(interaction) {
            // Retrieving the Option number, if it is Null we'll find a random meme.
            const number = interaction.options.getInteger('number') ?? Math.ceil(Math.random() * MemeAmount);
            return await interaction.reply({content: `Meme ${number} <:roast_circle:474755210485563404>`, files: [`/images/meme${number}.PNG`]});
        },
};
