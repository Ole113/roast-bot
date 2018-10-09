const Enmap = require("enmap");
const customRoast = new Enmap({ name: "custom-roast" });
const bsp = require("better-sqlite-pool");

const prefix_file = require("./prefix.json");

const custom_roasts = [
	{"number": 1, "roast": "You haven't set any custom roasts yet! Use `r!cr help` to learn how to."},
	{"number": 2, "roast": "You haven't set this custom roasts yet! Use `r!cr help` to learn how to."},
	{"number": 3, "roast": "You haven't set this custom roasts yet! Use `r!cr help` to learn how to."}
];

exports.run = async (message) => {
	customRoast.defer.then(() => {
		if (message.author.bot) return;

		if (message.content.toLowerCase().startsWith(prefix_file.prefix + "croast #")) {
			let content = message.content;
			let number = content.slice(prefix_file.prefix.length + 8, content.length);
			let number_int = parseInt(number);
			if(number_int > 3) {
				return message.channel.send("Sorry, that custom roast couldn't be found.");
			}
			return message.channel.send(`${custom_roasts[number_int - 1].roast}`);
		}
		if (message.content.toLowerCase().startsWith(prefix_file.prefix + "croast delete #") {
			let content = message.content;
		    	let content_slice = content.slice(prefix_file.prefix.length + 15, content.length);
			let number_int = parseInt(content_slice);
			custom_roasts[number_int] = "You haven't set this custom roasts yet! Use `r!cr help` to learn how to.";
			return message.channel.send(`Custom roast #${number_int} was removed successfully!`);

		}
		if (message.content.toLowerCase().startsWith(prefix_file.prefix + "croast ")) {

			const key = `${message.guild.id}-${message.author.id}`;

			if (!customRoast.has(key)) {
				customRoast.set(key, {
					user: message.author.id, guild: message.guild.id, number: 0, roast: 1
				});
			}

			let content = message.content;
			let custom_roast = content.slice(prefix_file.prefix.length + 7, content.length);

			let number = customRoast.get(key, "number");

			if (customRoast.get(key, "number") < 3) {
				customRoast.set(key, custom_roast, "roast");
				custom_roasts[number].roast = customRoast.get(key, "roast");
				customRoast.set(key, ++number, "number");
				return message.channel.send(`Custom Roast #${customRoast.get(key, "number")} and has been set to *${customRoast.get(key, "roast")}*`);
			} else {
				return message.channel.send("You have run out of free custom roasts. To get unlimited upgrade for only $1.50.");
			}
		}
	});
}
