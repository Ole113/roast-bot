const { SlashCommandBuilder } = require("discord.js");
const roasts = require("../../resources/roasts.json");

const maxRoastNumber = Math.max(...roasts.map((roast) => roast.number));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roast")
    .setDescription("Roast someone!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Specify an optional user to roast!"),
    )
    .addIntegerOption((option) =>
      option
        .setName("roast-id")
        .setDescription(
          "Specify an optional roast number. Blank if you want a random roast",
        )
        .setMinValue(1)
        .setMaxValue(maxRoastNumber),
    )
    .addBooleanOption((option) =>
      option
        .setName("nsfw")
        .setDescription(
          "Do you want the roast to have the chance to contain inappropriate language? Default is True",
        ),
    ),
  async execute(interaction) {
    try {
      /**
       * Generates a roast that has the right nsfw attribute
       */
      const generateRoast = (p_nsfw, p_roastNumber) => {
        // A specific roast was requested: find it by its number
        if (p_roastNumber !== null) {
          const chosenRoast = roasts.find(
            (roast) => roast.number === p_roastNumber,
          );

          // The number may not exist if the data has gaps
          if (!chosenRoast) return null;

          // If the user's specific roast doesn't fit the NSFW filter we need to tell them
          if (!p_nsfw && chosenRoast.nsfw) return null;

          return chosenRoast;
        }

        // No specific roast: pick at random from the pool that matches the NSFW filter
        const roastPool = p_nsfw
          ? roasts
          : roasts.filter((roast) => !roast.nsfw);
        return roastPool[Math.floor(Math.random() * roastPool.length)];
      };

      const user = interaction.options.getUser("user") ?? null;
      const nsfw = interaction.options.getBoolean("nsfw") ?? true;
      const roastID = interaction.options.getInteger("roast-id") ?? null;

      const generatedRoast = generateRoast(nsfw, roastID);

      // Checks if the roast id is NSFW
      if (generatedRoast == null) {
        return await interaction.reply(
          "The roast you chose is NSFW. Change the NSFW option to True if you want to see it. <:roast_circle:474755210485563404>",
        );
      }

      const message = `${generatedRoast.roast} \n **Roast #${generatedRoast.number}** <:roast_circle:474755210485563404>`;

      if (user == null) return await interaction.reply(message);

      return await interaction.reply(`${user}, ${message}`);
    } catch (p_error) {
      console.error("roast command failed:", p_error);
      return await interaction.reply(
        "Something went wrong. <:roast_circle:474755210485563404>",
      );
    }
  },
};
