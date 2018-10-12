
const Enmap = require("enmap");
const onOff = new Enmap({ name: "on-off" });
const bsp = require("better-sqlite-pool");

const prefix_file = require("./prefix.json");
const on_off_file = require("./on-off.json");

exports.run = async (message) => {
	onOff.defer.then(() => {
		if (message.author.bot) return;

		const key = `${message.guild.id}-${message.author.id}`;
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send("Sorry, you need to be an admin to turn this command on/off. <:roast_circle:474755210485563404>");
		}
		if (!onOff.has(key)) {
			onOff.set(key, {
				guild: message.guild.id
			});
		}
		if (message.content.toLowerCase().startsWith(prefix_file.prefix + "off")) {

			let contentt = message.content;
			let commandd = contentt.slice(prefix_file.prefix.length + 4, contentt.length);

			if (commandd.startsWith("roast")) {
				on_off_file.roast = "off";
				return message.channel.send("Roast command has been turn off. User `r!on roast` to turn it back on.");
			} else if (commandd.startsWith("meme")) {
				on_off_file.meme = "off";
				return message.channel.send("Meme command has been turned off. Use `r!on meme` to turn it back on.");
			} else if (commandd.startsWith("say")) {
				on_off_file.say = "off";
				return message.channel.send("Say command has been turned off. Use `r!on say` to turn it back on.");
			} else if (commandd.startsWith("user")) {
				on_off_file.user = "off";
				return message.channel.send("User command has been turned off. Use `r!on user` to turn it back on.");
			} else if (commandd.startsWith("urban")) {
				on_off_file.urban = "off";
				return message.channel.send("Urban command has been turned off. Use `r!on urban` to turn it back on.")
			} else if (commandd.startsWith("clear")) {
				on_off_file.clear = "off";
				return message.channel.send("Clear command has been turned off. Use `r!on clear` to turn it back on.");
			} else if (commandd.startsWith("server")) {
				on_off_file.server = "off";
				return message.channel.send("Server command has been turned off. Use `r!on server` to turn it back on.");
			} else if (commandd.startsWith("bot")) {
				on_off_file.bot = "off";
				return message.channel.send("Bot command has been turned off. Use `r!on bot` to turn it back on.");
			} else {
				return message.channel.send("That command doesn't exist or that command isn't available to be turned off.");
			}
		}
		if (message.content.toLowerCase().startsWith(prefix_file.prefix + "on")) {

			let content = message.content;
			let command = content.slice(prefix_file.prefix.length + 3, content.length);
			if (command.startsWith("roast")) {
				on_off_file.roast = "on";
				return message.channel.send("Roast command has been turn on. User `r!on roast` to turn it back off.");
			} else if (command.startsWith("meme")) {
				on_off_file.meme = "on";
				return message.channel.send("Meme command has been turned on. Use `r!on meme` to turn it back off.");
			} else if (command.startsWith("say")) {
				on_off_file.say = "on";
				return message.channel.send("Say command has been turned on. Use `r!on say` to turn it back off.");
			} else if (command.startsWith("user")) {
				on_off_file.user = "on";
				return message.channel.send("User command has been turned on. Use `r!on user` to turn it back off.");
			} else if (command.startsWith("urban")) {
				on_off_file.urban = "on";
				return message.channel.send("Urban command has been turned off. Use `r!on urban` to turn it back off.")
			} else if (command.startsWith("clear")) {
				on_off_file.clear = "on";
				return message.channel.send("Clear command has been turned on. Use `r!on clear` to turn it back off.");
			} else if (command.startsWith("server")) {
				on_off_file.server = "on";
				return message.channel.send("Server command has been turned on. Use `r!on server` to turn it back off.");
			} else if (command.startsWith("bot")) {
				on_off_file.bot = "on";
				return message.channel.send("Bot command has been turned on. Use `r!on bot` to turn it back off.");
			} else {
				return message.channel.send("That command doesn't exist or that command isn't available to be turned off.");
			}
		}
	});
}