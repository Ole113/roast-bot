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
				user: message.author.id, guild: message.guild.id
			});
			
		if(message.content.toLowerCase().startsWith(prefix_file.prefix + "on")) {
				
		}
		}
	}	 
}
