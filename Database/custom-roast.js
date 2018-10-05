const Enmap = require("enmap");
const customRoast = new Enmap({name: "custom-roast"});
const bsp = require("better-sqlite-pool");

const prefix_file = require("./prefix.json");

exports.run = async (message) => {
	customRoast.defer.then(() => {
        if(message.author.bot) return;
        
        if(message.content.toLowerCase().startsWith(prefix_file.prefix + "cr ")) {
           
            let content = message.content;
            let custom_roast = content.slice(prefix_file.prefix.length + 3, content.length);

            const key = `${message.guild.id}-${message.author.id}`;
			if(!customRoast.has(key)) {
			  customRoast.set(key, {
				user: message.author.id, guild: message.guild.id, number: 2, roast: 1
			  });
            }
            
            customRoast.set(key, custom_roast, "roast");
	    customRoast.set(key, --number, "number");
            return message.channel.send(`Custom Roast is ${customRoast.get(key, "roast")}`)
        }
    });
}
