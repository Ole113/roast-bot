/*
*
*  Ideas to add to Roast-Bot:
* ----------------------------
*  Add so if someone inputs a command wrong it will give an error message that says they can use rb!command help for more info.
*
*  Add a rb!user @USER and have stats such as if they have nitro, servers in, date joined disord and other info
*  Make it so when it has try catch block for commands if will eventaully send errors to db. 
*
*/
const Discord = require("discord.js");
const client = new Discord.Client();

const urbanFile = require("./Commands/urban.js");
const botFile = require("./Commands/bot.js");
const clearFile = require("./Commands/clear.js");
const serverFile = require("./Commands/server.js");
const inviteFile = require("./Commands/invite.js");
const helpFile = require("./Commands/help.js");
const roastFile = require("./Commands/roast.js");
const memeFile = require("./Commands/meme.js");
const sayFile = require("./Commands/say.js");
const xpLevelFile = require("./Database/xp-level.js");
const userFile = require("./Commands/user.js");
const customPrefixFile = require("./Database/custom-prefix.js");
const prefixFile = require("./Database/prefix.json");
const feedbackFile = require("./Database/feedback.js");
const customRoastFile = require("./Database/custom-roast.js");
const onOffFile = require("./Database/on-off.js");
const vid_file = require("./Commands/vid.js");

const bot_precense = [
	"https://ole113.github.io/Roast-Bot/",
	"On-Off now live! r!off commandName",
	"Custom Roasts now live! r!croast help",
	"Use r!feedback messasge to send feedback"
];
client.on("ready", () => {
	console.log("-----------------------------------")
	console.log("Roast-Bot-Beta is Ready");
	console.log("-----------------------------------")
	setInterval(() => {
		let random = Math.floor(Math.random() * 4);
		client.user.setActivity(`${prefixFile.prefix}help | ${bot_precense[random]}`, { type: "PLAYING" })
	}, 20000);
});
client.on("guildMemberAdd", (member) => {
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
client.on("guildMemberRemove", (member) => {
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
client.on("guildCreate", (guild) => {
	console.log("✔️Roast Bot joined a new server named: " + guild.name);
	console.log(`# of people in ${guild.name} is ${guild.memberCount} people.`);
	console.log("-----------------------------------")
});
client.on("guildDelete", (guild) => {
	console.log("❌Roast-Bot left a server named: " + guild.name);
	console.log(`# of people in ${guild.name} is ${guild.memberCount} people.`)
	console.log("-----------------------------------")
});
client.on("message", (message) => {
	onOffFile.run(message);
	helpFile.run(client, message);
	botFile.run(client, message);
	roastFile.run(message);
	inviteFile.run(message);
	serverFile.run(message);
	memeFile.run(message);
	sayFile.run(message);
	clearFile.run(message);
	urbanFile.run(message);
	xpLevelFile.run(message);
	userFile.run(message);
	feedbackFile.run(message);
	customPrefixFile.run(message);
	customRoastFile.run(message);
	vid_file.run(message);
});

client.login(process.env.BOT_TOKEN);
