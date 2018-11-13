const Enmap = require("enmap");
const onOff = new Enmap({ name: "on-off" });
const bsp = require("better-sqlite-pool");
 
const { prefixFile } = require("./prefix.json");

exports.run = async (message) => {
	onOff.defer.then(() => {
		if (message.author.bot) { return; }

		const key = message.guild.id;
		
		if (!onOff.has(key)) {
			onOff.set(key, {
				guild: message.guild.id, roast: "on", meme: "on", say: "on", user: "on", urban: "on", clear: "on", server: "on", bot: "on", vid: "on", censor: "off"
			});
		}
		
		const prefix = prefixFile.get(key, "prefix");

		if (message.content.toLowerCase() === prefix + "off help" || message.content.toLowerCase() === prefix + "on help") {
			return message.channel.send("**On-Off help:**\n\nTo use On-Off you first need to have admin permissions. Next you need to know which command to turn off, for this example we'll use roasts. Before the example of turning commands off remember that not all commamds can be turned off. The list of commands that cannot be turned off are: `r!invite`, `r!help`, custom prefixes, XP/Level, and the ability to turn commands on/off. Now for the example of turning roasts off:\n\nUSER: r!off roast\nRoast-Bot: Roast command has been turn off. User `r!on roast` to turn it back on.\n\nTurning a command back on after it having been turned off:\n\nUSER: r!on roast\nRoast-Bot: Roast command has been turn on. User `r!on roast` to turn it back off.\n\nAs long as you have \"roast\" the command will work, for example you could do `r!off roastsss` and the command would still work as long as you have roast in there.\n\n\nStill having trouble with on/off or have a suggestion? Join the support server: https://discordapp.com/invite/9y8yV42");
		}
		if (!message.member.hasPermission("ADMINISTRATOR") && (message.content.toLowerCase().startsWith(prefixFile.get(key, "prefix") + "off") || message.content.toLowerCase().startsWith(prefixFile.get(key, "prefix") + "on"))) {
			return message.channel.send("Sorry, you need to be an admin to turn this command on/off. <:roast_circle:474755210485563404>");
		}

		if (message.content.toLowerCase().startsWith(prefix + "off")) {
 
			let contentt = message.content;
			let commandd = contentt.slice(prefix.length + 4, contentt.length);
 
			if (commandd.toLowerCase().startsWith("roast")) {
				onOff.set(key, "off", "roast");
				return message.channel.send("Roast command has been turn off. User `r!on roast` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("meme")) {
				onOff.set(key, "off", "meme");
				return message.channel.send("Meme command has been turned off. Use `r!on meme` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("say")) {
				onOff.set(key, "off", "say");
				return message.channel.send("Say command has been turned off. Use `r!on say` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("user")) {
				onOff.set(key, "off", "user");
				return message.channel.send("User command has been turned off. Use `r!on user` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("urban")) {
				onOff.set(key, "off", "urban");
				return message.channel.send("Urban command has been turned off. Use `r!on urban` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("clear")) {
				onOff.set(key, "off", "clear");
				return message.channel.send("Clear command has been turned off. Use `r!on clear` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("server")) {
				onOff.set(key, "off", "server");
				return message.channel.send("Server command has been turned off. Use `r!on server` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("bot")) {
				onOff.set(key, "off", "bot");
				return message.channel.send("Bot command has been turned off. Use `r!on bot` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("vid")) {
				onOff.set(key, "off", "vid");
				return message.channel.send("Video command has been turned off. Use `r!on vid` to turn it back on.");
			/*} else if (commandd.toLowerCase().startsWith("censor")) {
				onOff.set(key, "off", "censor");
				return message.channel.send("Roast Censoring has been turned off. Use `r!on censor` to turn it back on.");
			*/
			} else {
				return message.channel.send("That command doesn't exist or that command isn't available to be turned off.");
			}
		}
		if (message.content.toLowerCase().startsWith(prefixFile.get(key, "prefix") + "on")) {
 
			let content = message.content;
			let command = content.slice(prefixFile.get(key, "prefix").length + 3, content.length);
			if (command.toLowerCase().startsWith("roast")) {
				onOff.set(key, "on", "roast");
				return message.channel.send("Roast command has been turn on. User `r!on roast` to turn it back off.");
			} else if (command.toLowerCase().startsWith("meme")) {
				onOff.set(key, "on", "meme");
				return message.channel.send("Meme command has been turned on. Use `r!on meme` to turn it back off.");
			} else if (command.toLowerCase().startsWith("say")) {
				onOff.set(key, "on", "say");
				return message.channel.send("Say command has been turned on. Use `r!on say` to turn it back off.");
			} else if (command.toLowerCase().startsWith("user")) {
				onOff.set(key, "on", "user");
				return message.channel.send("User command has been turned on. Use `r!on user` to turn it back off.");
			} else if (command.toLowerCase().startsWith("urban")) {
				onOff.set(key, "on", "urban");
				return message.channel.send("Urban command has been turned off. Use `r!on urban` to turn it back off.");
			} else if (command.toLowerCase().startsWith("clear")) {
				onOff.set(key, "on", "clear");
				return message.channel.send("Clear command has been turned on. Use `r!on clear` to turn it back off.");
			} else if (command.toLowerCase().startsWith("server")) {
				onOff.set(key, "on", "server");
				return message.channel.send("Server command has been turned on. Use `r!on server` to turn it back off.");
			} else if (command.toLowerCase().startsWith("bot")) {
				onOff.set(key, "on", "bot");
				return message.channel.send("Bot command has been turned on. Use `r!on bot` to turn it back off.");
			} else if (command.toLowerCase().startsWith("vid")) {
				onOff.set(key, "on", "vid");
				return message.channel.send("Video command has been turned on. Use `r!on vid` to turn it back off.");
			/*} else if (command.toLowerCase().startsWith("censor")) {
				onOff.set(key, "on", "censor");
				return message.channel.send("Roast Censoring has been turned on. Use `r!on censor` to turn it back off.");
			*/
			} else {
				return message.channel.send("That command doesn't exist or that command isn't available to be turned off.");
			}
		}
	});
};
exports.onOff = onOff;
