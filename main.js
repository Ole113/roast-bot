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

const tokenFile = require("./token.json");

const botFile = require("./commands/bot.js");
const clearFile = require("./commands/clear.js");
const serverFile = require("./commands/server.js");
const inviteFile = require("./commands/invite.js");
const helpFile = require("./commands/help.js");
const roastFile = require("./commands/roast.js");
const memeFile = require("./commands/meme.js");
const urbanFile = require("./commands/urban");
const userFile = require("./commands/user.js");
const vidFile = require("./commands/vid.js");
const websiteFile = require("./commands/website.js");
const updatesFile = require("./commands/updates.js");
const sayFile = require("./commands/say.js");
const searchRoastsFile = require("./commands/searchRoasts.js");
const leaderboardFile = require("./commands/leaderboard.js");

const feedbackFile = require("./database/feedback/feedback.js");
const XPLevelFile = require("./database/xpLevel/XPLevel.js");
const customPrefixFile = require("./database/customPrefix/customPrefix.js");
const onOffFile = require("./database/onOff/onOff.js");
const customRoastFile = require("./database/customRoast/customRoast.js");

const dbConfigFile = require("./dbConfig.json")

const mysql = require("mysql");

let connection = mysql.createConnection({
	host: dbConfigFile.host,
	user: dbConfigFile.user,
	password: dbConfigFile.password,
	database: dbConfigFile.database,
	port: dbConfigFile.port
});

connection.connect();

//makes it so the current prefix is in the activity every 5 seconds.

client.on("ready", () => {
	console.log("-----------------------------------")
	console.log("Roast-Bot-Beta is Ready");
	console.log("-----------------------------------")
	/*
	connection.query(`SELECT * FROM roast_bot_custom_prefix WHERE guildID = "${message.guild.id}";`, function (err, result) {
		if (err) console.log(err);
		let prefix;
		//checks if prefix has been set or not.
		if (!result.length) {
			prefix = "rb!";
		} else {
			prefix = result[0].prefix;
		}
		*/
	//setInterval(() => {
		client.user.setActivity(`${"rb!"}help | roast-bot.com`, { type: "PLAYING" });
	//}, 50000);
});

client.on("guildMemberAdd", (member) => {
	let welcomeleavechannel = member.guild.channels.find((c) => c.name === "welcome-leave-log");
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
	//database files

	//customCommandFile.run(message);
	//customRoastFile.run(message);
	//censorFile.run(message);
	onOffFile.run(message);
	XPLevelFile.run(message);
	feedbackFile.run(message);
	customPrefixFile.run(message);
	customRoastFile.run(message);
	
	//command files
	helpFile.run(client, message);
	botFile.run(client, message);
	roastFile.run(message);
	inviteFile.run(message);
	serverFile.run(message);
	memeFile.run(message);
	sayFile.run(message);
	clearFile.run(message);
	urbanFile.run(message);
	userFile.run(message);
	vidFile.run(message);
	websiteFile.run(message);
	updatesFile.run(message);
	searchRoastsFile.run(message);
	leaderboardFile.run(message);
});

client.login(tokenFile.token);