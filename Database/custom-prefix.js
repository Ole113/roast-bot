const Enmap = require("enmap");
const customPrefix = new Enmap({name: "custom-prefix"});
const bsp = require("better-sqlite-pool");

const prefix_file = require("./prefix.json");

exports.run = async (message) => {
   if(message.content.toLowerCase() == "rb!prefix help") {
     return message.channel.send("**r!prefix help:**\n\nTo use a custom prefix with Roast-Bot you first need to set it.  First see if anyone has previously set it by doing `r!prefix`. If the prefix hasn’t been set it will return a message saying something like “You have not set the prefix...” and so forth. If the prefix has already been set it will say what the prefix is.\n\nNext, we need to set the prefix with `r!prefix newPrefix`. To check if they prefix was set right do `r!prefix`.\n\nIf you have forgotten the prefix that you set you can always change it with `r!prefix newPrefix` and can always view it with `r!prefix` no matter what the prefix is.\n\nExample Setting the Prefix:\n\nUSER: r!prefix !\nRoast-Bot: Custom Prefix set to *!*.\n\nExample Viewing Prefix:\n\nUSER: r!prefix\nRoast-Bot: Current Prefix is *!*.\n\n**Note:** You can use emojis as a prefix but it's not advised to do this.\n\n\nStill having trouble with `r!prefix` or have a suggestion? Join the support server: https://discordapp.com/invite/9y8yV42");
  }
	customPrefix.defer.then(() => {
		if(message.author.bot) return;
			if (!message.member.hasPermission("ADMINISTRATOR") && (message.content.toLowerCase().startsWith(prefix_file.prefix + "prefix")) {
			return message.channel.send("Sorry, you need to be an admin to set your servers custom prefix. <:roast_circle:474755210485563404>");
		}	if(message.content.toLowerCase() == prefix_file.prefix + "prefix" || message.content.toLowerCase() == "rb!prefix") {
			const key = `${message.guild.id}-${message.author.id}`;
			if(customPrefix.has(key)) {
				return message.channel.send(`Current Prefix is *${customPrefix.get(key, "prefix")}*.`);
			} else if(!customPrefix.has(key)) {
				return message.channel.send("Looks like you haven't set a custom prefix yet! To set a custom prefix use `rb!prefix <newPrefix>`.");
			}
		}
		if(message.content.toLowerCase().startsWith("rb!prefix ") || message.content.toLowerCase().startsWith(prefix_file.prefix + "prefix ")) {
			
			let content = message.content;
			let custom_prefix = content.slice(prefix_file.prefix.length + 7, content.length);

			let default_prefix = "rb!"; 

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