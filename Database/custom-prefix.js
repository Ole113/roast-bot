const Enmap = require("enmap");
const customPrefix = new Enmap({name: "custom-prefix"});
const bsp = require("better-sqlite-pool");

exports.run = async (message) => {
	customPrefix.defer.then(() => {
		if(message.author.bot) return;
		if(message.content.toLowerCase().startsWith("rb!prefix ")) {
			
			let content = message.content;
			let custom_prefix = content.slice(10, content.length);

			let default_prefix = "r!";

			const key = `${message.guild.id}-${message.author.id}`;
			if(!customPrefix.has(key)) {
			  customPrefix.set(key, {
				user: message.author.id, guild: message.guild.id, prefix: default_prefix
			  });
			}
			
			return message.channel.send(`Default Prefix: ${customPrefix.get(key, "prefix")} and Custom Prefix: ${custom_prefix}`);

			/*
			if(message.content.toLowerCase() === "rb!prefix") {
				const key = `${message.guild.id}-${message.author.id}`;
				return message.channel.send(`Custom Prefix: ${customPrefix.get(key, "prefix")} .`);
			} */
			
		}
	});
}