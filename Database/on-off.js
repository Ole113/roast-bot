const Enmap = require("enmap");
const onOff = new Enmap({name: "on-off"});
const bsp = require("better-sqlite-pool");

const prefix_file = require("./prefix.json");
const onOff_file  = require("./on-off.json");

exports.run = async (message) => {
	onOff.defer.then(() => {
		if (message.author.bot) return;
		
		const key = `${message.guild.id}-${message.author.id}`;

		if (!onOff.has(key)) {
			onOff.set(key, {
				user: message.author.id, guild: message.guild.id, "roast": "on", "meme": "on", "say": "on", "user": "on", "urban": "on", "clear": "on", "server": "on", "bot": "on"
			});
		}	
		if(message.content.toLowerCase().startsWith(prefix_file.prefix + "on")) {
			const roast = onOff.get(key, "roast");
			const meme = onOff.get(key, "meme");
			const say = onOff.get(key, "say");
			const user = onOff.get(key, "user");
			const urban = onOff.get(key, "urban");
			const clear = onOff.get(key, "clear");
			const server = onOff.get(key, "server");
			const bot = onOff.get(key, "bot");

			let content = message.content;
			let command = content.slice(prefix_file.prefix.length + 3, content.length);
			
			return message.channel.send(`Prefix was ${command}`);
		}
	} 
}
