const Enmap = require("enmap");
const customPrefix = new Enmap({name: "custom-prefix"});
const bsp = require("better-sqlite-pool");

const prefix_file = require("./prefix.json");

exports.run = async (message) => {
	customPrefix.defer.then(() => {
		if(message.author.bot) return;
		if(message.content.toLowerCase() == "rb!prefix") {
			const key = `${message.guild.id}-${message.author.id}`;
			if(customPrefix.has(key)) {
				return message.channel.send(`Current Prefix is *${customPrefix.get(key, "prefix")}*.`);
			} else if(!customPrefix.has(key)) {
				return message.channel.send("Looks like you haven't set a custom prefix yet! To set a custom prefix use `r!prefix <newPrefix>`.");
			}
		}
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

			customPrefix.set(key, custom_prefix, "prefix");
			prefix_file.prefix = custom_prefix;
			return message.channel.send(`Custom Prefix set to *${customPrefix.get(key, "prefix")}*.`);
		}
	});
}