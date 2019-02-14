const Enmap = require("enmap");
const onOff = new Enmap({ name: "on-off" });
const bsp = require("better-sqlite-pool");

const { prefixFile } = require("./prefix.json");

exports.run = async (message) => {
	if (message.author.bot) { return; }
	const prefix = "rb!";

	if (message.content.toLowerCase() === "rb!" + "off help" || message.content.toLowerCase() === prefix + "on help") {
		return message.channel.send("**On-Off help:**\n\nTo use On-Off you first need to have admin permissions. Next you need to know which command to turn off, for this example we'll use roasts. Before the example of turning commands off remember that not all commamds can be turned off. The list of commands that cannot be turned off are: `rb!invite`, `rb!help`, custom prefixes, XP/Level, and the ability to turn commands on/off. Now for the example of turning roasts off:\n\nUSER: rb!off roast\nRoast-Bot: Roast command has been turn off. User `rb!on roast` to turn it back on.\n\nTurning a command back on after it having been turned off:\n\nUSER: rb!on roast\nRoast-Bot: Roast command has been turn on. User `rb!on roast` to turn it back off.\n\nAs long as you have \"roast\" the command will work, for example you could do `rb!off roastsss` and the command would still work as long as you have roast in there.\n\n\nStill having trouble with on/off or have a suggestion? Join the support server: https://discordapp.com/invite/9y8yV42");
	}
	onOff.defer.then(() => {
		const key = message.guild.id;

		if (!onOff.has(key)) {
			onOff.set(key, {
				guild: message.guild.id, roast: "on", meme: "on", say: "on", user: "on", urban: "on", clear: "on", server: "on", bot: "on", vid: "on", censor: "off"
			});
		}

		if (!message.member.hasPermission("ADMINISTRATOR") && (message.content.toLowerCase().startsWith("rb!") || message.content.toLowerCase().startsWith("rb!" + "on"))) {
			return message.channel.send("Sorry, you need to be an admin to turn this command on/off. <:roast_circle:474755210485563404>");
		}

		if (message.content.toLowerCase().startsWith("rb!" + "off")) {

			let contentt = message.content;
			let commandd = contentt.slice(prefixFile.prefix.length + 4, contentt.length);

			if (commandd.toLowerCase().startsWith("roast")) {
				onOff.set(key, "off", "roast");
				return message.channel.send("Roast command has been turn off. User `rb!on roast` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("meme")) {
				onOff.set(key, "off", "meme");
				return message.channel.send("Meme command has been turned off. Use `rb!on meme` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("say")) {
				onOff.set(key, "off", "say");
				return message.channel.send("Say command has been turned off. Use `rb!on say` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("user")) {
				onOff.set(key, "off", "user");
				return message.channel.send("User command has been turned off. Use `rb!on user` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("urban")) {
				onOff.set(key, "off", "urban");
				return message.channel.send("Urban command has been turned off. Use `rb!on urban` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("clear")) {
				onOff.set(key, "off", "clear");
				return message.channel.send("Clear command has been turned off. Use `rb!on clear` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("server")) {
				onOff.set(key, "off", "server");
				return message.channel.send("Server command has been turned off. Use `rb!on server` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("bot")) {
				onOff.set(key, "off", "bot");
				return message.channel.send("Bot command has been turned off. Use `rb!on bot` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("vid")) {
				onOff.set(key, "off", "vid");
				return message.channel.send("Video command has been turned off. Use `rb!on vid` to turn it back on.");
				/*} else if (commandd.toLowerCase().startsWith("censor")) {
					onOff.set(key, "off", "censor");
					return message.channel.send("Roast Censoring has been turned off. Use `rb!on censor` to turn it back on.");
				*/
			} else {
				return message.channel.send("That command doesn't exist or that command isn't available to be turned off.");
			}
		}
		if (message.content.toLowerCase().startsWith("rb!" + "on")) {

			let content = message.content;
			let command = content.slice(prefixFile.prefix.length + 3, content.length);
			if (command.toLowerCase().startsWith("roast")) {
				onOff.set(key, "on", "roast");
				return message.channel.send("Roast command has been turn on. User `rb!on roast` to turn it back off.");
			} else if (command.toLowerCase().startsWith("meme")) {
				onOff.set(key, "on", "meme");
				return message.channel.send("Meme command has been turned on. Use `rb!on meme` to turn it back off.");
			} else if (command.toLowerCase().startsWith("say")) {
				onOff.set(key, "on", "say");
				return message.channel.send("Say command has been turned on. Use `rb!on say` to turn it back off.");
			} else if (command.toLowerCase().startsWith("user")) {
				onOff.set(key, "on", "user");
				return message.channel.send("User command has been turned on. Use `rb!on user` to turn it back off.");
			} else if (command.toLowerCase().startsWith("urban")) {
				onOff.set(key, "on", "urban");
				return message.channel.send("Urban command has been turned off. Use `rb!on urban` to turn it back off.");
			} else if (command.toLowerCase().startsWith("clear")) {
				onOff.set(key, "on", "clear");
				return message.channel.send("Clear command has been turned on. Use `rb!on clear` to turn it back off.");
			} else if (command.toLowerCase().startsWith("server")) {
				onOff.set(key, "on", "server");
				return message.channel.send("Server command has been turned on. Use `rb!on server` to turn it back off.");
			} else if (command.toLowerCase().startsWith("bot")) {
				onOff.set(key, "on", "bot");
				return message.channel.send("Bot command has been turned on. Use `rb!on bot` to turn it back off.");
			} else if (command.toLowerCase().startsWith("vid")) {
				onOff.set(key, "on", "vid");
				return message.channel.send("Video command has been turned on. Use `rb!on vid` to turn it back off.");
				/*} else if (command.toLowerCase().startsWith("censor")) {
					onOff.set(key, "on", "censor");
					return message.channel.send("Roast Censoring has been turned on. Use `rb!on censor` to turn it back off.");
				*/
			} else {
				return message.channel.send("That command doesn't exist or that command isn't available to be turned off.");
			}
		}
	});
};
exports.onOff = onOff;