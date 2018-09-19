/*const Enmap = require("enmap");
const xpLevel = new Enmap({name: "xp-level"});
const bsp = require("better-sqlite-pool");

exports.run = async (message) => {
	/*
	*
	*   Things to add to Database:
	*  ----------------------------
	*  Custom prefix.
	*  Custom Roast adding.
	*  Custom Meme adding.
	*  When you level up stil send the command that they did but then do the level up thing.
	*  Make it so people cannot spam Roast-Bot commands to get more XP.
	*
	
	xpLevel.defer.then( () => {
		if(message.author.bot) return;
		if(message.content.startsWith("rb!")) {
			const key = `${message.guild.id}-${message.author.id}`;
			if(!xpLevel.has(key)) {
			  xpLevel.set(key, {
				user: message.author.id, guild: message.guild.id, points: 0, level: 1
			  });
			}
			let currentPoints = xpLevel.get(key, "points");
			xpLevel.set(key, ++currentPoints, "points");
			let curLevel = xpLevel.get(key, "level");
			if(currentPoints == 10) {
				xpLevel.set(key, ++curLevel, "level");
				return message.reply("Level up, your now level 2: Roast-Noob! <:roast_circle:474755210485563404>");
			}else if(currentPoints == 15 ) {
				xpLevel.set(key, ++curLevel, "level");
				return message.reply("Level up, your now level 3: Roast-Learner! <:roast_circle:474755210485563404>");
			} else if(currentPoints == 25) {
				xpLevel.set(key, ++curLevel, "level");
				return message.reply("Level up, your now level 4: Mediocre Roaster! <:roast_circle:474755210485563404>");
			} else if(currentPoints == 50) {
				xpLevel.set(key, ++curLevel, "level");
				return message.reply("Level up, your now level 5: Advanced Roaster! <:roast_circle:474755210485563404>");
			} else if(currentPoints == 100) {
				xpLevel.set(key, ++curLevel, "level");
				return message.reply("Level up, your now level 6: Roast-Master! <:roast_circle:474755210485563404>");
			} else if(currentPoints == 200) {
				xpLevel.set(key, ++curLevel, "level");
				return message.reply("Level up, your now level 7: Roast-Jesus! <:roast_circle:474755210485563404>");
			} else if(currentPoints == 500) {
				xpLevel.set(key, ++curLevel, "level");
				return message.reply("Level up, your now level 8: Roast-God! <:roast_circle:474755210485563404>");
			} else if(currentPoints == 1000) {
				xpLevel.set(key, ++curLevel, "level");
				return message.reply("Level up, your now level 9: Roast-Champion! <:roast_circle:474755210485563404>");
			} else if(currentPoints == 10000) {
				xpLevel.set(key, ++curLevel, "level");
				return message.reply("Level up, your now max level, level 10. Join the support server to get to submit and custom roast to be added to Roast-Bot. Invite Link: https://discord.gg/NvVX6VD! <:roast_circle:474755210485563404>");
			}
			xpLevel.set(key, curLevel, "level");
		}
		/*
		*
		*   Things to add to r!level:
		*  ---------------------------
		*  
		*
		
		if (message.content === "rb!level") {
			const key = `${message.guild.id}-${message.author.id}`;
			let currentPoints = xpLevel.get(key, "points");
			xpLevel.set(key, --currentPoints, "points");
			return message.reply(` You currently have ${xpLevel.get(key, "points")} XP, and are level ${xpLevel.get(key, "level")}! <:roast_circle:474755210485563404>`);
		
		}
	  });
}
*/