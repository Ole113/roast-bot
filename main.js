const Discord = require("discord.js");
const client = new Discord.Client();
import { TOKEN } from "./token.js";

const botFile = require("./commands/bot.js");
const clearFile = require("./commands/clear.js");
const inviteFile = require("./commands/invite.js");
const helpFile = require("./commands/help.js");
const roastFile = require("./commands/roast.js");
const memeFile = require("./commands/meme.js");
const userFile = require("./commands/user.js");
const updatesFile = require("./commands/updates.js");
const sayFile = require("./commands/say.js");
const searchRoastsFile = require("./commands/searchRoasts.js");
const urbanFile = require("./commands/urban.js");

client.on("ready", () => {
    console.log("-----------------------------------");
    console.log("Roast-Bot is Ready");
    console.log("-----------------------------------");
    client.shard.fetchClientValues("guilds.cache.size")
        .then(results => {
            console.log(`${results.reduce((acc, guildCount) => acc + guildCount, 0)} total guilds`);
        })
        .catch(console.error);
    client.user.setActivity(`r!help`, { type: "PLAYING" });
});

client.on("message", (message) => {
    if (message.content.toLowerCase().startsWith("r!")) {
        if (message.guild === null) {
            return message.channel.send("You cannot use this command in DM");
        } else {
            botFile.run(client, message);
            roastFile.run(message);
            inviteFile.run(message);
            helpFile.run(client, message);
            memeFile.run(message);
            sayFile.run(message);
            clearFile.run(message);
            userFile.run(message);
            updatesFile.run(client, message);
            searchRoastsFile.run(message);
            urbanFile.run(message);
        }
    }
});

client.login(TOKEN);