const Enmap = require("enmap");
const customRoast = new Enmap({ name: "custom-roast" });
const bsp = require("better-sqlite-pool");

const prefixFile = require("./prefix.json");

const customRoasts = [
	{ "number": 1, "roast": "You haven't set any custom roasts yet! Use `r!cr help` to learn how to." },
	{ "number": 2, "roast": "You haven't set this custom roasts yet! Use `r!cr help` to learn how to." },
	{ "number": 3, "roast": "You haven't set this custom roasts yet! Use `r!cr help` to learn how to." }
];

exports.run = async (message) => {
	customRoast.defer.then(() => {
		if (message.author.bot) return;
		if (message.content.toLowerCase().startsWith(prefixFile.prefix + "croast delete #")) {
			let content = message.content;
			let contentSlice = content.slice(prefixFile.prefix.length + 15, content.length);
			let numberInt = parseInt(contentSlice);
			customRoasts[numberInt - 1].roast = "You haven't set any custom roasts yet! Use `r!cr help` to learn how to.";
			return message.channel.send(`Custom roast #${numberInt} was removed successfully!`);
		}
		if (message.content.toLowerCase().startsWith(prefixFile.prefix + "croast #")) {
			let content = message.content;
			let number = content.slice(prefixFile.prefix.length + 8, content.length);
			let numberInt = parseInt(number);
			if (numberInt > 3 || numberInt < 1) {
				return message.channel.send("Sorry, that custom roast couldn't be found.");
			}
			return message.channel.send(`${customRoasts[numberInt - 1].roast}`);
		}

		if (message.content.toLowerCase().startsWith(prefixFile.prefix + "croast ")) {

			const key = `${message.guild.id}-${message.author.id}`;

			if (!customRoast.has(key)) {
				customRoast.set(key, {
					user: message.author.id, guild: message.guild.id, number: 0, roast: 1
				});
			}

			let content = message.content;
			let customRoastSlice = content.slice(prefixFile.prefix.length + 7, content.length);

			let number = customRoast.get(key, "number");

			if (customRoast.get(key, "number") < 3) {
				customRoast.set(key, customRoastSlice, "roast");
				customRoasts[number].roast = customRoast.get(key, "roast");
				customRoast.set(key, ++number, "number");
				return message.channel.send(`Custom Roast #${customRoast.get(key, "number")} and has been set to *${customRoast.get(key, "roast")}*`);
			} else {
				return message.channel.send("You have run out of free custom roasts. To get unlimited upgrade for only $1.50.");
			}
		}
	});
}
exports.customRoastFile = customRoasts;