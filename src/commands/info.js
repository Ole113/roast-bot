const fs = require("node:fs");
const path = require("node:path");
const process = require("process");

const { version } = require("../../package.json");
const roasts = require("../../resources/roasts.json");

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const roastLength = String(roasts.length);
const memeLength = String(
  fs.readdirSync(path.join(__dirname, "../../resources/memes")).length,
);
const commandLength = String(
  fs.readdirSync(path.join(__dirname, "../commands")).length,
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Gives information about Roast Bot"),
  async execute(interaction) {
    try {
      /**
       * Formats seconds into hours, minutes, seconds
       * Helper method from https://stackoverflow.com/questions/28705009/how-do-i-get-the-server-uptime-in-node-js
       */
      const format = (p_uptime) => {
        const pad = (p_s) => (p_s < 10 ? "0" : "") + p_s;

        const hours = Math.floor(p_uptime / (60 * 60));
        const minutes = Math.floor((p_uptime % (60 * 60)) / 60);
        const seconds = Math.floor(p_uptime % 60);

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
      };

      const guildCounts =
        await interaction.client.cluster.fetchClientValues("guilds.cache.size");
      const totalGuilds = String(
        guildCounts.reduce((p_acc, p_count) => p_acc + p_count, 0),
      );

      const memberCounts = await interaction.client.cluster.broadcastEval(
        (p_c) =>
          p_c.guilds.cache.reduce(
            (p_acc, p_guild) => p_acc + p_guild.memberCount,
            0,
          ),
      );
      const totalMembers = String(
        memberCounts.reduce((p_acc, p_count) => p_acc + p_count, 0),
      );

      const icon = interaction.client.user.avatarURL();
      const embed = new EmbedBuilder()
        .setColor("#EB671D")
        .setTitle("<:roast_circle:474755210485563404> Bot Information:")
        .setDescription("Information about Roast bot")
        .setThumbnail(icon)
        .addFields(
          { name: "Bot Name:", value: interaction.client.user.username },
          {
            name: "Created On:",
            value: interaction.client.user.createdAt
              .toISOString()
              .split("T")[0],
          },
          { name: "Version: ", value: version },
          { name: "Number of Roasts: ", value: roastLength },
          { name: "Number of Memes: ", value: memeLength },
          { name: "Number of Commands:", value: commandLength },
          { name: "Server Count:", value: totalGuilds },
          { name: "Total Users:", value: totalMembers },
          { name: "Uptime:", value: format(process.uptime()) },
          {
            name: "Support Server",
            value:
              "Are you experiencing problems with Roast Bot or do you have any suggestions? Join our Support server Today: https://discordapp.com/invite/9y8yV42",
          },
        )
        .setFooter({ text: "Created by Ole113" });

      return await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Error in info command:", error);
      return await interaction.reply(
        "Something went wrong getting bot info. <:roast_circle:474755210485563404>",
      );
    }
  },
};
