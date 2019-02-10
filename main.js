/*
*
*  Ideas to add to Roast-Bot:
* ----------------------------
*  Add so if someone inputs a command wrong it will give an error message that says they can use r!command help for more info.
*
*  Add a r!user @USER and have stats such as if they have nitro, servers in, date joined disord and other info
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
const censorFile = require("./database/censor/censor.js");

const connection = require("./dbConnect.js");

//makes it so the current prefix is checked for an update every 5 seconds.
client.on("ready", () => {
	console.log("-----------------------------------");
	console.log("Roast-Bot is Ready");
	console.log("-----------------------------------");

	client.user.setActivity(`r!help | roast-bot.com`, { type: "PLAYING" });

});

client.on("message", (message) => {

	//database files
	//customCommandFile.run(message);
	//customRoastFile.run(message);
	customPrefixFile.run(message);
	if (message.content.toLowerCase().startsWith(customPrefixFile.prefix || "r!")) {

		connection.query(`SELECT * FROM roast_bot_on_off WHERE guildID = "${message.guild.id}";`, function (err, result) {
			if (err) console.log(err);

			//sets the default of everything to ON.
			if (!result.length) {
				connection.query(`INSERT INTO roast_bot_on_off (guildID, username, _clear, bot, meme, roast, say, _server, urban, user, vid) VALUES ("${message.guild.id}", "${message.author.username}", "${1}", "${1}", "${1}", "${1}", "${1}", "${1}", "${1}", "${1}", "${1}");`, function (err, result) {
					if (err) console.log(err);
				});
				onOffFile.run(message);
				//censorFile.run(message);
				feedbackFile.run(message);
				//customRoastFile.run(message);
				XPLevelFile.run(message);

				//command files
				botFile.run(client, message);
				roastFile.run(message);
				inviteFile.run(message);
				serverFile.run(message);
				helpFile.run(client, message);
				memeFile.run(message);
				sayFile.run(message);
				clearFile.run(message);
				urbanFile.run(message);
				userFile.run(message);
				//vidFile.run(message);
				websiteFile.run(message);
				updatesFile.run(message);
				searchRoastsFile.run(message);
				leaderboardFile.run(message);
			} else {
				onOffFile.run(message);
				//censorFile.run(message);
				feedbackFile.run(message);
				//customRoastFile.run(message);
				XPLevelFile.run(message);

				//command files
				botFile.run(client, message);
				roastFile.run(message);
				inviteFile.run(message);
				serverFile.run(message);
				helpFile.run(client, message);
				memeFile.run(message);
				sayFile.run(message);
				clearFile.run(message);
				urbanFile.run(message);
				userFile.run(message);
				//vidFile.run(message);
				websiteFile.run(message);
				updatesFile.run(message);
				searchRoastsFile.run(message);
				leaderboardFile.run(message);
			}
		});
	}
});

client.login(tokenFile.token);