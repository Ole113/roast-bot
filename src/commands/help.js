const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get command help for Roast Bot!"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor("#EB671D")
      .setTitle(`Roast Bot Help`)
      .addFields(
        {
          name: "/roast *user* *roast-id* *nsfw*",
          value:
            "If none of the optional parameters are provided then a random roast will be chosen. After every roast it will say Roast #... - this is the roast-id. If the roast-id is provided the specific Roast will be sent. If the NSFW flag is set to False then Roasts will no contain any inappropriate language",
        },
        {
          name: "/roast search *keyword* *lower-range* *upper-range*",
          value:
            "One of the parameters must be set and depending on which parameters are set it returns roasts that contain keyword/have a roast-id that is within the lower-range and/or upper-range",
        },
        {
          name: "/meme *number*",
          value:
            "If the number is not specified a random meme will be sent. If the number is specified the specific meme will be sent",
        },
        { name: "/invite", value: "Link to invite Roast-Bot to a server" },
        {
          name: "/urban *word*",
          value: "Search up a word in the Urban Dictionary!",
        },
        {
          name: "/say *message*",
          value: "Use this command to have Roast Bot say whatever you want!",
        },
        {
          name: "/clear *number*",
          value:
            "Choose how many messages you want to delete. **To use this command Roast-Bot needs to given Manage Messages permissions.**",
        },
        { name: "/info", value: "Returns some information about Roast-Bot." },
      )
      .setFooter({
        text: "If you still need help, have any questions or feedback join the Roast-Bot help server! https://discord.gg/fuDF42D",
      });

    return await interaction.reply({ embeds: [embed] });
  },
};
