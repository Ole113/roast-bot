const Enmap = require("enmap");
const customRoast = new Enmap({name: "custom-roast"});
const bsp = require("better-sqlite-pool");

const prefix_file = require("./prefix.json");

exports.run = async (message) => {
	customRoast.defer.then(() => {
        if(message.author.bot) return;
        
        if(message.content.toLowerCase().startsWith("rb!cr ")) {
           
            let content = message.content;
            let custom_roast = content.slice(6, content.length);

            const key = `${message.guild.id}-${message.author.id}`;
			if(!customRoast.has(key)) {
			  customRoast.set(key, {
				user: message.author.id, guild: message.guild.id, roast: custom_roast
			  });
            }
            
            customRoast.set(key, custom_prefix, "prefix");
            return message.channel.send(`Custom Roast is ${customPrefix.get(key, "roast")}`)
        }
    });
}