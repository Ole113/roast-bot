const Enmap = require("enmap");
const customPrefix = new Enmap({name: "custom-prefix"});
const bsp = require("better-sqlite-pool");

exports.run = async (message) => {
	customPrefix.defer.then(() => {
		if(message.author.bot) return;
		if(message.content.toLowerCase().startsWith("rb!prefix ")) {
			
			let content = message.content;
			let custom_prefix = content.slice(9, content.length);

			const key = `${message.guild.id}-${message.author.id}`;
			if(!customPrefix.has(key)) {
				customPrefix.set(key, {
					user: message.author.id, guild: message.guild.id, prefix: "r!"
				});
			}
			let currentPrefix = customPrefix.get(key, "prefix");
			customPrefix.set(key, custom_prefix, "prefix");
			let curPrefix = customPrefix.get(key, "prefix");

			return message.channel.send(customPrefix);
			
			if(message.content.toLowerCase() === "rb!prefix") {
				const key = `${message.guild.id}-${message.author.id}`;
				let currentPrefix = customPrefix.get(key, "prefix");
				return message.channel.send(`Custom Prefix: ${customPrefix.get(key, "prefix")} .`);
			}
		}
	});
}