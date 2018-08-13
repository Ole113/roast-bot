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


	/*
	*
	*   Things to add to r!help:
	*  --------------------------
	*  
	*
	*/
	if(message.content === "r!help") {
		let help_icon = client.user.displayAvatarURL;
		let help_embed = new Discord.RichEmbed()
		.setColor("#EB671D")
		.setTitle("Roast-Bot Help:")
		.addBlankField()
		.setThumbnail(help_icon)
		.addField("***Commands:***\n\nr!help", "List of Roast-Bot Commands.")
		.addField("r!bot", "Learn more about Roast-Bot.")
		.addField("r!roast @USER, r!roast, or r!roast #roastNumber", "Generate a random roast with the number of roast it was.")
		.addField("r!invite", "Link to invite Roast-Bot to a server")
		.addField("r!server", "Info about your server.")
		.addField("r!meme, or r!meme #memeNumber", "Sends a meme to the current channel.")
		.addField("r!clear NUMBER", "Choose how many messages you want to delete. Max is 100. **To use this command Roast-Bot needs to given Manage Messages permissions.**")
		.addField("r!say", "To use this command use `r!say ` and then what you want Roast-Bot to say.")
		.addBlankField()
		.addField("***Utilities:***\n\nwelcome-leave-log:", "To use the Roast-Bot welcome-leave-log make a channel named \"welcome-leave-log\". If you don't want to use the log just don't make a channel named welcome-leave-log.")
		//.addField("XP-System", "Everytime you use a Roast-Bot command your XP increases! Use r!level to check your level and XP! **r!level is in BETA** Level 1: 0-9XP, Level 2: 10XP, Level 3: 15XP, Level 4: 25XP Level 5: 50XP, Level 6: 100XP, Level 7: 200XP, Level 8: 500XP, Level 9: 1,000XP, Level 10: 10,000XP")
		.addBlankField()
		.addField("Roast-Bot Development Server:", "If you still need help, have any questions or feedback join the Roast-Bot help server. \n \n https://discord.gg/fuDF42D")
		.setFooter("v1.8.0, for release notes join the Roast-Bot help server. ");
		return message.channel.send(help_embed);
	/*
	*
	*   Things to add to r!bot:
	* ----------------------------
	*  Add more stats in the future.
	*
	*/
	} else if(message.content === "r!bot"){
        let bot_icon = client.user.displayAvatarURL;
        let bot_embed = new Discord.RichEmbed()
        .setColor("#EB671D")
		.setTitle("<:roast_circle:474755210485563404> Bot Information:")
		.addBlankField()
	    .setThumbnail(bot_icon)
		.addField("Bot Name:", client.user.username)
		.addField("Created On:", client.user.createdAt)
		.addField("Server Count:", client.guilds.size)
		.addField("Total Number of Roasts:", "108", true)
		.addField("Total Number of Memes:", "123", true)
		//.addField("Total Users:", )
		.setFooter("Created By Ole113#2421");
		return message.channel.send(bot_embed);
	/*
	*
	*   Things to add to r!roast, r!roast @, r!roast #:
	* ----------------------------
	*  Make it so people cannot roast bots reason being "Bots are too powerfull to be roasted" or something like that.
	*
	*/
	} else if(message.content === "r!roast"){
        const random_roasts = Math.ceil(Math.random() * 108);
		return message.channel.send(roasts[random_roasts - 1].roast + `\n **Roast #${random_roasts}** <:roast_circle:474755210485563404>`);
    } else if(message.content.startsWith("r!roast ")){
		const random = Math.ceil(Math.random() * 108);
		const word = message.content;
		const reply = word.slice(8, word.length);
		if(message.content.startsWith("r!roast #")){
			let word1 = message.content;
			let number1 = word1.slice(9, word1.length);
			let number_int = parseInt(number1);
			return message.channel.send(roasts[number_int - 1].roast + `\n **Roast #${number_int}** <:roast_circle:474755210485563404>`);
		}

		return message.channel.send(reply + ", " + roasts[random - 1].roast + `\n **Roast #${random}** <:roast_circle:474755210485563404>`);
	/*
	*
	*   Things to add to r!invite:
	* ----------------------------
	*  
	*
	*/	
	} else if(message.content === "r!invite") {
		let invite_embed = new Discord.RichEmbed()
		.setColor("#EB671D")
		.setTitle("***Invite Link***  <:roast_circle:474755210485563404>")
		.setURL("https://discordapp.com/oauth2/authorize?client_id=461361233644355595&scope=bot&permissions=8")
		.setFooter("Roast-Bot v1.8.0");
		return message.channel.send(invite_embed);
	/*
	*
	*   Things to add to r!server:
	* ----------------------------
	*  Add more stats.
	*
	*/	
    } else if(message.content === "r!server"){
		let server_icon = message.guild.iconURL;
		let server_embed = new Discord.RichEmbed()
		.setColor("#EB671D")
		.setTitle("Server Information:")
		.addBlankField()
		.setThumbnail(server_icon)
		.addField("Server Name:", message.guild.name)
		.addField("Created On:", message.guild.createdAt)
		.addField("You Joined:", message.member.joinedAt)
		.addField("Total Members:", message.guild.memberCount);
		return message.channel.send(server_embed);
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
	/*
	*
	*   Things to add to r!clear:
	* ----------------------------
	*  Make it so it deletes the exact number of messages.
	*
	*/	
	} else if(message.content.startsWith("r!clear")){
		const word = message.content;
		const number = word.slice(7, word.length);
		const int = Number(number);
		if(!message.guild.me.hasPermission("MANAGE_MESSAGES")){
			return message.channel.send("Roast-Bot needs to be given Manage Messages permissions to use this command :( <:roast_circle:474755210485563404>");
		} else if(int >= 100){
			return message.channel.send("The max number of messages you can delete is 100 :( <:roast_circle:474755210485563404>");
		} else if(!message.member.hasPermission("MANAGE_MESSAGES")){
			return message.channel.send("Looks like you dont have the permissions to do that :( <:roast_circle:474755210485563404>");
		} else if(int == "" || int == " "){
			return message.channel.send("Incorrect usage of r!clear, please provide how many messages you want to be deleted. The correct usage is r!clear NUMBER. <:roast_circle:474755210485563404>");
		}
		message.channel.bulkDelete(int).then(() => {
			return message.channel.send(`Cleared ${int} messages. <:roast_circle:474755210485563404>`)
		});
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
		urban_file.run(client, message);
	};
});
//message.reply
client.login(process.env.BOT_TOKEN);