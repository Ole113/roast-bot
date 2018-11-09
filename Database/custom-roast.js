const Enmap = require("enmap");
const customRoast = new Enmap({ name: "custom-roast" });
const bsp = require("better-sqlite-pool");

const prefixFile = require("./prefix.json");

exports.run = async (message) => {
	customRoast.defer.then(() => {
		if (message.author.bot) { return; }
		if (message.content.toLowerCase() == "rb!croast help") {
			return message.channel.send("Coming soon.");
		}
		if (message.content.toLowerCase().startsWith(prefixFile.prefix + "croast delete #")) {
			let content = message.content;
			let contentSlice = content.slice(prefixFile.prefix.length + 15, content.length);
			let numberInt = parseInt(contentSlice);
			customRoasts[numberInt - 1].roast = "You haven't set any custom roasts yet! Use `r!croast help` to learn how to.";
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
					user: message.author.id, number: 0, roast1: "You haven't set any custom roasts yet! Use `r!croast help` to learn how to.", roast2: "You haven't set any custom roasts yet! Use `r!croast help` to learn how to.", roast3: "You haven't set any custom roasts yet! Use `r!croast help` to learn how to."
				});
			}

			let content = message.content;
			let customRoastSlice = content.slice(prefixFile.prefix.length + 7, content.length);

			let number = customRoast.get(key, "number");

			if (customRoast.get(key, "number") < 3) {
				//customRoast.set(key, customRoastSlice, "roast");
				//customRoasts[number].roast = customRoast.get(key, "roast");
				//if (customRoast.get(key, "roast1") != 1)
				customRoast.set(key, ++number, "number");
				return message.channel.send(`Custom Roast #${customRoast.get(key, "number")} and has been set to *${customRoast.get(key, "roast")}*`);
			} else {
				return message.channel.send("You can only have 3 custom roasts.");
			}
		}
	});
};
//exports.customRoastFile = customRoasts;