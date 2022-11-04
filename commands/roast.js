const { SlashCommandBuilder } = require("discord.js");
const roasts = require('../roasts.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roast')
		.setDescription('Roasts a user!')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('Select the user to roast')
		)
		.addIntegerOption(option =>
			option
				.setName('number')
				.setDescription('pick what roast to send.')
				.setMinValue(0)
				.setMaxValue(roasts.length)
		),
		async execute(interaction) {

			// Shady work-around to avoid having to send a reply but also avoid the "interaction didn't respond" message.
			await interaction.reply("if you can read this you're extremely fast and i'm fascinated by your fast reading skills!");
			await interaction.deleteReply();

			// Figuring out the desired target, number and creating the default message content.
			const target = interaction.options.getUser('user') ?? null;
			const number = interaction.options.getInteger('number') ?? Math.ceil(Math.random() * roasts.length - 1);
			const message = `${roasts[number].roast} \n **Roast #${number}** <:roast_circle:474755210485563404>`	;		

			// Determining if the target is set, if not it should just send the message "AS IS"
			try {
				if (target == null) {
					return await interaction.channel.send(message);
				}
				return await interaction.channel.send(`${target}, ${message}`);
			} catch (err) {
				console.error(err);

				// Error code 50013 is Missing permissions to channel
				if (err.code == 50013) {
					return await interaction.user.send(`Whoops. it looks like i'm unable to send messages in: ${interaction.guild.name} > #${interaction.channel.name}`);
				}
			}
		}
}

module.exports.roasts = roasts;