
const Enmap = require("enmap");
const onOff = new Enmap({ name: "on-off" });
const bsp = require("better-sqlite-pool");

const prefixFile = require("./prefix.json");
const onOffFile = require("./on-off.json");

exports.run = async (message) => {
	onOff.defer.then(() => {
		if (message.author.bot) return;
		if (message.content.toLowerCase() === prefixFile.prefix + "off help" || message.content.toLowerCase() === prefixFile.prefix + "on help") {
			return message.channel.send("**On-Off help:**\n\nTo use On-Off you first need to have admin permissions. Next you need to know which command to turn off, for this example we'll use roasts. Before the example of turning commands off remember that not all commamds can be turned off. The list of commands that cannot be turned off are: `r!invite`, `r!help`, custom prefixes, XP/Level, and the ability to turn commands on/off. Now for the example of turning roasts off:\n\nUSER: r!off roast\nRoast-Bot: Roast command has been turn off. User `r!on roast` to turn it back on.\n\nTurning a command back on after it having been turned off:\n\nUSER: r!on roast\nRoast-Bot: Roast command has been turn on. User `r!on roast` to turn it back off.\n\nAs long as you have \"roast\" the command will work, for example you could do `r!off roastsss` and the command would still work as long as you have roast in there.\n\n\nStill having trouble with on/off or have a suggestion? Join the support server: https://discordapp.com/invite/9y8yV42");
		}
		const key = `${message.guild.id}-${message.author.id}`;
		if (!message.member.hasPermission("ADMINISTRATOR") && (message.content.toLowerCase().startsWith(prefixFile.prefix + "off") || message.content.toLowerCase().startsWith(prefixFile.prefix + "on"))) {
			return message.channel.send("Sorry, you need to be an admin to turn this command on/off. <:roast_circle:474755210485563404>");
		}
		if (!onOff.has(key)) {
			onOff.set(key, {
				guild: message.guild.id
			});
		}
		if (message.content.toLowerCase().startsWith(prefixFile.prefix + "off")) {

			let contentt = message.content;
			let commandd = contentt.slice(prefixFile.prefix.length + 4, contentt.length);

			if (commandd.toLowerCase().startsWith("roast")) {
				onOffFile.roast = "off";
				return message.channel.send("Roast command has been turn off. User `r!on roast` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("meme")) {
				onOffFile.meme = "off";
				return message.channel.send("Meme command has been turned off. Use `r!on meme` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("say")) {
				onOffFile.say = "off";
				return message.channel.send("Say command has been turned off. Use `r!on say` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("user")) {
				onOffFile.user = "off";
				return message.channel.send("User command has been turned off. Use `r!on user` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("urban")) {
				onOffFile.urban = "off";
				return message.channel.send("Urban command has been turned off. Use `r!on urban` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("clear")) {
				onOffFile.clear = "off";
				return message.channel.send("Clear command has been turned off. Use `r!on clear` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("server")) {
				onOffFile.server = "off";
				return message.channel.send("Server command has been turned off. Use `r!on server` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("bot")) {
				onOffFile.bot = "off";
				return message.channel.send("Bot command has been turned off. Use `r!on bot` to turn it back on.");
			} else if (commandd.toLowerCase().startsWith("vid")) {
				onOffFile.vid = "off";
				return message.channel.send("Video command has been turned off. Use `r!on vid` to turn it back on.");
			} else {
				return message.channel.send("That command doesn't exist or that command isn't available to be turned off.");
			}
		}
		if (message.content.toLowerCase().startsWith(prefixFile.prefix + "on")) {

			let content = message.content;
			let command = content.slice(prefixFile.prefix.length + 3, content.length);
			if (command.toLowerCase().startsWith("roast")) {
				onOffFile.roast = "on";
				return message.channel.send("Roast command has been turn on. User `r!on roast` to turn it back off.");
			} else if (command.toLowerCase().startsWith("meme")) {
				onOffFile.meme = "on";
				return message.channel.send("Meme command has been turned on. Use `r!on meme` to turn it back off.");
			} else if (command.toLowerCase().startsWith("say")) {
				onOffFile.say = "on";
				return message.channel.send("Say command has been turned on. Use `r!on say` to turn it back off.");
			} else if (command.toLowerCase().startsWith("user")) {
				onOffFile.user = "on";
				return message.channel.send("User command has been turned on. Use `r!on user` to turn it back off.");
			} else if (command.toLowerCase().startsWith("urban")) {
				onOffFile.urban = "on";
				return message.channel.send("Urban command has been turned off. Use `r!on urban` to turn it back off.");
			} else if (command.toLowerCase().startsWith("clear")) {
				onOffFile.clear = "on";
				return message.channel.send("Clear command has been turned on. Use `r!on clear` to turn it back off.");
			} else if (command.toLowerCase().startsWith("server")) {
				onOffFile.server = "on";
				return message.channel.send("Server command has been turned on. Use `r!on server` to turn it back off.");
			} else if (command.toLowerCase().startsWith("bot")) {
				onOffFile.bot = "on";
				return message.channel.send("Bot command has been turned on. Use `r!on bot` to turn it back off.");
			} else if (command.toLowerCase().startsWith("vid")) {
				onOffFile.vid = "on";
				return message.channel.send("Video command has been turned on. Use `r!on vid` to turn it back off.");
			} else {
				return message.channel.send("That command doesn't exist or that command isn't available to be turned off.");
			}
		}
	});
};