/**
 * Knowledge for how to do this from https://github.com/gavwin/toasty/blob/master/src/commands/util/largestservers.js
*/

const prefixFile = require("../database/customPrefix/customPrefix.js");

exports.run = async (client, message) => {
	if (message.content.toLowerCase().startsWith(prefixFile.prefix + "top servers")) {
		const guilds = client.guilds;
		const sorted = guilds.array().sort((a, b) => { 
			return b.memberCount - a.memberCount; 
		});
		const topFive = sorted.splice(0, 5);
		const top = new Array();

		topFive.forEach((guild, i) => {

			top.push(`\`\`\`asciidoc
= ${guild.name} =\n• Members :: ${guild.memberCount.toLocaleString()}\`\`\``);
		});
		return message.channel.send(top.join("\n"));
	}
}