
const Enmap = require("enmap");
const onOff = new Enmap({ name: "on-off" });
const bsp = require("better-sqlite-pool");

const prefix_file = require("./prefix.json");
const onOff_file = require("./on-off.json");

exports.run = async (message) => {
	onOff.defer.then(() => {
		if (message.author.bot) return;

		const key = `${message.guild.id}-${message.author.id}`;

		if (!onOff.has(key)) {
			onOff.set(key, {
				guild: message.guild.id
			});
		}
		if (message.content.toLowerCase().startsWith(prefix_file.prefix + "off")) {

			let content = message.content;
			let command = content.slice(prefix_file.prefix.length + 4, content.length);
			if (command.startsWith("roast")) {
				onOff_file.roast = "off";
				return message.channel.send("Roast command has been turn off. User `r!on roast` to turn it back on.");
			} else if (command.startsWith("meme")) {
				onOff_file.meme = "off";
				return message.channel.send("Meme command has been turned off. Use `r!on meme` to turn it back on.");
			} else if (command.startsWith("say")) {
				onOff_file.say = "off";
				return message.channel.send("Say command has been turned off. Use `r!on say` to turn it back on.");
			} else if (command.startsWith("user")) {
				onOff_file.user = "off";
				return message.channel.send("User command has been turned off. Use `r!on user` to turn it back on.");
			} else if (command.startsWith("clear")) {
				onOff_file.clear = "off";
				return message.channel.send("Clear command has been turned off. Use `r!on clear` to turn it back on.");
			} else if (command.startsWith("server")) {
				onOff_file.server = "off";
				return message.channel.send("Server command has been turned off. Use `r!on server` to turn it back on.");
			} else if (command.startsWith("bot")) {
				onOff_file.bot = "off";
				return message.channel.send("Bot command has been turned off. Use `r!on bot` to turn it back on.");
			} else {
				return message.channel.send("That command doesn't exist or that command isn't available to be turned off.");
			}
		}
		if (message.content.toLowerCase().startsWith(prefix_file.prefix + "on")) {

			let content = message.content;
			let command = content.slice(prefix_file.prefix.length + 3, content.length);
			if (command.startsWith("roast")) {
				onOff_file.roast = "on";
				return message.channel.send("Roast command has been turn on. User `r!on roast` to turn it back on.");
			} else if (command.startsWith("meme")) {
				onOff_file.meme = "on";
				return message.channel.send("Meme command has been turned on. Use `r!on meme` to turn it back on.");
			} else if (command.startsWith("say")) {
				onOff_file.say = "on";
				return message.channel.send("Say command has been turned on. Use `r!on say` to turn it back on.");
			} else if (command.startsWith("user")) {
				onOff_file.user = "on";
				return message.channel.send("User command has been turned on. Use `r!on user` to turn it back on.");
			} else if (command.startsWith("clear")) {
				onOff_file.clear = "on";
				return message.channel.send("Clear command has been turned on. Use `r!on clear` to turn it back on.");
			} else if (command.startsWith("server")) {
				onOff_file.server = "on";
				return message.channel.send("Server command has been turned on. Use `r!on server` to turn it back on.");
			} else if (command.startsWith("bot")) {
				onOff_file.bot = "on";
				return message.channel.send("Bot command has been turned on. Use `r!on bot` to turn it back on.");
			} else {
				return message.channel.send("That command doesn't exist or that command isn't available to be turned on.");
			}
		}
		
	});
}
