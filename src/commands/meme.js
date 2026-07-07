const { SlashCommandBuilder } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const memeLength = fs.readdirSync(path.join(__dirname, "../../resources/memes")).length;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("meme")
        .setDescription("Get a meme!")
        .addIntegerOption(option =>
            option
                .setName("number")
                .setDescription("Pick an optional specific meme")
                .setMinValue(1)
                .setMaxValue(memeLength)
        ),
    async execute(interaction) {
        const randomMemeNumber = interaction.options.getInteger("number") ?? Math.floor(Math.random() * (memeLength - 1)) + 1;

        return await interaction.reply({ content: `Meme ${randomMemeNumber} <:roast_circle:474755210485563404>`, files: [`../resources/memes/meme${randomMemeNumber}.PNG`] });
    }
};