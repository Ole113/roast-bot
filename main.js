/*
*
*  Ideas to add to Roast-Bot:
* ----------------------------
*  Tic-Tac-Toe Game:
*  Learn more about collectors and use those.
*  https://discordjs.guide/#/popular-topics/collectors
*
*/
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const urban_file = require("./Commands/urban.js");
const bot_file = require("./Commands/bot.js");
const clear_file = require("./Commands/clear.js");
const server_file = require("./Commands/server.js");
const invite_file = require("./Commands/invite.js");
const help_file = require("./Commands/help.js");
const roast_file = require("./Commands/roast.js");
//const Enmap = require("enmap");
//const Provider = require("enmap-sqlite");
//client.points = new Enmap({provider: new Provider({name: "points"})});
/*
*
*   Things to add to Roasts:
* ----------------------------
*  Add more Roasts from both Roast Apps.
*
*/	

	
/*
*
*   Things to add to Bot being on:
*  -------------------------------
*   Log how many users Roast-Bot serves.
*
*/
client.on("ready", () => {
	console.log("-----------------------------------")
	console.log("Roast-Bot is Ready");
	console.log("Number of servers Roast-Bot is in: " + client.guilds.size);
	console.log("-----------------------------------")
    client.user.setActivity("r!help", { type: "PLAYING" })	   
});
/*
*
*   Things to add to welcome-leave log:
* ----------------------------
*  Add it so users image is smaller and isnt the thumbnail.
*
*/
client.on("guildMemberAdd", member => {
	let welcomeleavechannel = member.guild.channels.find(c => c.name === "welcome-leave-log");
	if (!welcomeleavechannel) return;
	let join_time = new Date();
	let join_embed = new Discord.RichEmbed()
	.setTitle(member.user.username + " has joined the server.")
	.setColor("#EB671D")
	.addField("Time:", join_time)
	.addField("Tag:", member)
	.setThumbnail(member.user.displayAvatarURL);
	welcomeleavechannel.send(join_embed);
	console.log(`${member.user.username} has joined the ${member.guild} Discord.`);
});
client.on("guildMemberRemove", member => {
	let welcomeleavechannel = member.guild.channels.find(c => c.name === "welcome-leave-log");
	let leave_time = new Date();
	if (!welcomeleavechannel) return;
	let leave_embed = new Discord.RichEmbed()
	.setTitle(member.user.username + " has left the server, later aligator.")
	.setColor("#EB671D")
	.addField("Time:", leave_time)
	.addField("Tag:", member)
	.setThumbnail(member.user.displayAvatarURL);
	welcomeleavechannel.send(leave_embed);
	console.log(`${member.user.username} has left the ${member.guild} Discord.`);
});
/*
*
*   Things to add to guildCreate/Delete:
*  -------------------------------------
*   DONE:	Make it so it will log how many users are in the servers that it joins.
*
*/
client.on("guildCreate", guild => {
	console.log("✔️Roast Bot joined a new server named: " + guild.name);
	console.log(`# of people in ${guild.name} is ${guild.memberCount} people.`);
	console.log("-----------------------------------")
});
client.on("guildDelete", guild => {
	console.log("❌Roast-Bot left a server named: " + guild.name);
	console.log(`# of people in ${guild.name} is ${guild.memberCount} people.`)
	console.log("-----------------------------------")
})
client.on("message", message => {
	
	/*
	*
	*   Things to add to Database:
	*  ----------------------------
	*  Look into free vps that work with enmap.
	*  Custom prefix.
	*  Custom Roast adding.
	*  Custom Meme adding.
	*  When you level up stil send the command that they did but then do the level up thing.
	*  Make it so people cannot spam Roast-Bot commands to get more XP.
	*
	if(message.author.bot) return;
	if(message.content.startsWith("r!")) {
		const key = `${message.guild.id}-${message.author.id}`;
		if(!client.points.has(key)) {
		  client.points.set(key, {
			user: message.author.id, guild: message.guild.id, points: 0, level: 1
		  });
		}
		let currentPoints = client.points.get(key, "points");
		client.points.set(key, ++currentPoints, "points");
		let curLevel = client.points.get(key, "level");
		if(currentPoints == 10) {
			client.points.set(key, ++curLevel, "level");
			return message.reply("Level up, your now level 2: Roast-Noob! <:roast_circle:474755210485563404>");
		}else if(currentPoints == 15 ) {
			client.points.set(key, ++curLevel, "level");
			return message.reply("Level up, your now level 3: Roast-Learner! <:roast_circle:474755210485563404>");
		} else if(currentPoints == 25) {
			client.points.set(key, ++curLevel, "level");
			return message.reply("Level up, your now level 4: Mediocre Roaster! <:roast_circle:474755210485563404>");
		} else if(currentPoints == 50) {
			client.points.set(key, ++curLevel, "level");
			return message.reply("Level up, your now level 5: Advanced Roaster! <:roast_circle:474755210485563404>");
		} else if(currentPoints == 100) {
			client.points.set(key, ++curLevel, "level");
			return message.reply("Level up, your now level 6: Roast-Master! <:roast_circle:474755210485563404>");
		} else if(currentPoints == 200) {
			client.points.set(key, ++curLevel, "level");
			return message.reply("Level up, your now level 7: Roast-Jesus! <:roast_circle:474755210485563404>");
		} else if(currentPoints == 500) {
			client.points.set(key, ++curLevel, "level");
			return message.reply("Level up, your now level 8: Roast-God! <:roast_circle:474755210485563404>");
		} else if(currentPoints == 1000) {
			client.points.set(key, ++curLevel, "level");
			return message.reply("Level up, your now level 9: Roast-Champion! <:roast_circle:474755210485563404>");
		} else if(currentPoints == 10000) {
			client.points.set(key, ++curLevel, "level");
			return message.reply("Level up, your now max level, level 10. Join the support server to get to submit and custom roast to be added to Roast-Bot. Invite Link: https://discord.gg/NvVX6VD! <:roast_circle:474755210485563404>");
		}
		client.points.set(key, curLevel, "level");
	}
	
	*
	*   Things to add to r!level:
	*  ---------------------------
	*  
	*
	
	if (message.content === "r!level") {
		const key = `${message.guild.id}-${message.author.id}`;
		let currentPoints = client.points.get(key, "points");
		client.points.set(key, --currentPoints, "points");
		return message.reply(` You currently have ${client.points.get(key, "points")} XP, and are level ${client.points.get(key, "level")}! <:roast_circle:474755210485563404>`);
	
	}
	*/

	if(message.content === "r!help") {
		help_file.run(message);
	} else if(message.content === "r!bot"){
		bot_file.run(client, message);
	/*
	*
	*   Things to add to r!roast, r!roast @, r!roast #:
	* ----------------------------
	*  Make it so people cannot roast bots reason being "Bots are too powerfull to be roasted" or something like that.
	*
	*/
	}else if(message.content.startsWith("r!roast")){
		roast_file.run(message);
	} else if(message.content === "r!invite") {
		invite_file.run(message);
    } else if(message.content === "r!server"){
		server_file.run(message);
	/*
	*
	*   Things to add to r!meme:
	* ----------------------------
	*  
	*
	*/
	} else if(message.content.startsWith("r!meme")) {
		const random_memes = Math.ceil(Math.random() * 123);
		if(message.content.startsWith("r!meme #")){
			let word2 = message.content;
			let number2 = word2.slice(8, word2.length);
			let number_int1 = parseInt(number2);
			return message.channel.send(`Meme #${number_int1} <:roast_circle:474755210485563404>`, {files: [`Images/meme${number_int1}.PNG`]})
		} else{ return message.channel.send(`Meme #${random_memes} <:roast_circle:474755210485563404>`, {files: [`Images/meme${random_memes}.PNG`]})};
	
	} else if(message.content.startsWith("r!clear")){
		const word = message.content;
		const number = word.slice(7, word.length);
		const int = Number(number);

		clear_file.run(message, int);

	/*
	*
	*   Things to add to r!say:
	* ----------------------------
	*  Make it so bots cannot use r!say.
	*
	*/	
	} else if(message.content.startsWith("r!say ")){
		const word = message.content;
		const say = word.slice(6, word.length);
		return message.channel.send(say);
	} else if(message.content.startsWith("r!urban")) {
		let word = message.content;
		let args = word.slice(8, word.length);
		if(args == ""){
			return message.channel.send("**Please enter something to search up.**  <:roast_circle:474755210485563404>")
		}

		urban_file.run(message, args);
	};
});
//message.reply
client.login(process.env.BOT_TOKEN);