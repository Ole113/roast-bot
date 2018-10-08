const Enmap = require("enmap");
const customRoast = new Enmap({ name: "custom-roast" });
const bsp = require("better-sqlite-pool");

const prefix_file = require("./prefix.json");

exports.run = async (message) => {
	customRoast.defer.then(() => {
		if (message.author.bot) return;

		if (message.content.toLowerCase().startsWith(prefix_file.prefix + "cr ")) {

			const key = `${message.guild.id}-${message.author.id}`;

			if (!customRoast.has(key)) {
				customRoast.set(key, {
					user: message.author.id, guild: message.guild.id, number: 0, roast: 1
				});
			}

			const custom_roasts = [
				{"number": 1, "roast": ""},
				{"number": 2, "roast": ""}
			];

			let content = message.content;
			let custom_roast = content.slice(prefix_file.prefix.length + 3, content.length);

			let number = customRoast.get(key, "number");
			let roast = customRoast.get(key, "roast");

			if (message.content.toLowerCase() == prefix_file.prefix + "cr") {
				return message.channel.send(`test`);
			}


			if (customRoast.get(key, "number") < 3) {
				customRoast.set(key, custom_roast, "roast");
				customRoast.set(key, ++number, "number");
				custom_roasts[number] = roast;
				return message.channel.send(`Custom Roast #${customRoast.get(key, "number")} and has been set to *${customRoast.get(key, "roast")}*`);
			} else {
				return message.channel.send("You have run out of free custom roasts. To get unlimited upgrade for only $1.50.");
			}
		}
	});
}
