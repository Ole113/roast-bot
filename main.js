/*
*
*  Ideas to add to Roast-Bot:
* ----------------------------
*
*  Add so if someone inputs a command wrong it will give an error message that says they can use r!command help for more info.
*
*  Add a r!user @USER and have stats such as if they have nitro, servers in, date joined disord and other info
*  Make it so when it has try catch block for commands if will eventaully send errors to db. 
*
*/ 
const Discord = require("discord.js");
const client = new Discord.Client();

const urban_file = require("./Commands/urban.js");
const bot_file = require("./Commands/bot.js");
const clear_file = require("./Commands/clear.js");
const server_file = require("./Commands/server.js");
const invite_file = require("./Commands/invite.js");
const help_file = require("./Commands/help.js");
const roast_file = require("./Commands/roast.js");
const meme_file = require("./Commands/meme.js");
const say_file = require("./Commands/say.js");
const dbMain_file = require("./Database/main.js");

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

client.on("ready", () => {
	console.log("-----------------------------------")
	console.log("|      Roast-Bot-Beta is Ready    |");
	console.log("-----------------------------------")
    client.user.setActivity("rb!help", { type: "PLAYING" })	   
});
/* **Archived for main bot**
client.on("guildCreate", guild => {
	console.log("✔️Roast Bot joined a new server named: " + guild.name);
	console.log(`# of people in ${guild.name} is ${guild.memberCount} people.`);
	console.log("-----------------------------------")
});
client.on("guildDelete", guild => {
	console.log("❌Roast-Bot left a server named: " + guild.name);
	console.log(`# of people in ${guild.name} is ${guild.memberCount} people.`)
	console.log("-----------------------------------")
});
*/
client.on("message", message => {
	help_file.run(client, message);
	bot_file.run(client, message);
	roast_file.run(message);
	invite_file.run(message);
	server_file.run(message);
	meme_file.run(message);
	say_file.run(message);
	clear_file.run(message);
	urban_file.run(message);
	dbMain_file.run(message);
});
client.login(process.env.BOT_TOKEN);