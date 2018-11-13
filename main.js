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

const botFile = require("./Commands/bot.js");
const clearFile = require("./Commands/clear.js");
const serverFile = require("./Commands/server.js");
const inviteFile = require("./Commands/invite.js");
const helpFile = require("./Commands/help.js");
const roastFile = require("./Commands/roast.js");
const memeFile = require("./Commands/meme.js");
const sayFile = require("./Commands/say.js");
const urbanFile = require("./Commands/urban");
const xpLevelFile = require("./Database/xp-level.js");
const userFile = require("./Commands/user.js");
const customPrefixFile = require("./Database/custom-prefix.js");
const prefixFile = require("./Database/prefix.json");
const feedbackFile = require("./Database/feedback.js");
const customRoastFile = require("./Database/custom-roast.js");
const onOffFile = require("./Database/on-off.js");
const vidFile = require("./Commands/vid.js");
const pollFile = require("./Commands/poll.js");
const websiteFile = require("./Commands/website.js");
const updatesFile = require("./Commands/updates.js");
const customCommandFile = require("./Database/customCommand.js");
const censorFile = require("./Database/censor.js");

const key = message.guild.id;

client.on("ready", () => {
	console.log("-----------------------------------")
	console.log("Roast-Bot-Beta is Ready");
	console.log("-----------------------------------")
	client.user.setActivity(`${prefixFile.get(key, "prefix")}help | roast-bot.com`, { type: "PLAYING" });
});
client.on("guildMemberAdd", (member) => {
	let welcomeleavechannel = member.guild.channels.find(c => c.name === "welcome-leave-log");
	if (!welcomeleavechannel) return;
	let joinTime = new Date();
	let joinEmbed = new Discord.RichEmbed()
		.setTitle(member.user.username + " has joined the server.")
		.setColor("#EB671D")
		.addField("Time:", joinTime)
		.addField("Tag:", member)
		.setThumbnail(member.user.displayAvatarURL);
	welcomeleavechannel.send(joinEmbed);
});
client.on("guildMemberRemove", (member) => {
	let welcomeleavechannel = member.guild.channels.find((c) => c.name === "welcome-leave-log");
	let leaveTime = new Date();
	if (!welcomeleavechannel) { return; }
	let leaveEmbed = new Discord.RichEmbed()
		.setTitle(member.user.username + " has left the server, later aligator.")
		.setColor("#EB671D")
		.addField("Time:", leaveTime)
		.addField("Tag:", member)
		.setThumbnail(member.user.displayAvatarURL);
	welcomeleavechannel.send(leaveEmbed);
});
client.on("message", (message) => {
	onOffFile.run(message);
	censorFile.run(message);
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
	vidFile.run(message);
	pollFile.run(message);
	websiteFile.run(message);
	updatesFile.run(message);
	customCommandFile.run(message);
});

client.login(process.env.BOT_TOKEN);
