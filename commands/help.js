/*
*
*   Things to add to r!help:
* ----------------------------
* Help from: https://kmcgamer.github.io/programming/discordhelp/ I didnt take any code from there tho.
*/

const Discord = require("discord.js");

const dbConfigFile = require("../dbConfig.json")
const prefixFile = require("../database/customPrefix/customPrefix.js");

const mysql = require("mysql");

let connection = mysql.createConnection({
    host: dbConfigFile.host,
    user: dbConfigFile.user,
    password: dbConfigFile.password,
    database: dbConfigFile.database,
    port: dbConfigFile.port
});

connection.connect();

exports.run = async (client, message) => {
    let page = 1;
    let first = false;
    if (message.author.bot) { return; }

    if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}help`)) {
        const pageForward = (reaction) => reaction.emoji.name === "▶";
        const pageBackward = (reaction) => reaction.emoji.name === "◀";
        const stop = (reaction) => reaction.emoji.name === "⏹";

        const pageOneEmbed = new Discord.RichEmbed({
            title: "Roast-Bot Help:",
            color: 15427357,
            fields: [
                { name: "\n\n*Commands:*\n\nr!help", value: "List of Roast-Bot Commands." },
                { name: "r!roast *@user*, r!roast, or r!roast *roastNumber*", value: "Generate a random roast with the number of roast it was." },
                { name: "r!meme, or r!meme *memeNumber*", value: "Sends a meme to the current channel." },
                { name: "r!urban *whatToSearch*", value: "Search up anything on the Urban Dictionary!" },
                { name: "r!invite", value: "Link to invite Roast-Bot to a server." },
            ],
            footer: {
                text: "Page 1 of 4."
            }
        });
        message.channel.send(pageOneEmbed)
            .then(async (mmReaction) => await mmReaction.react("◀"))
            .then(async (mmmReaction) => await mmmReaction.message.react("⏹"))
            .then(async (mmmReaction) => await mmmReaction.message.react("▶"))
            .then(async mReaction => {
                first = true;
                const collectorPageForward = mReaction.message.createReactionCollector(pageForward);
                const collectorPageBackward = mReaction.message.createReactionCollector(pageBackward);
                const collectorStop = mReaction.message.createReactionCollector(stop);

                const pageTwoEmbed = new Discord.RichEmbed({
                    title: pageOneEmbed.title,
                    color: 15427357,
                    fields: [
                        { name: "\n\nr!user, or r!user *@user*", value: "r!user returns stats about you, or the person you tagged. The stats include: current presence, user id, current game, when their account was created and more!" },
                        { name: "r!say *whatToSay*", value: "To use this command use `r!say ` and then what you want Roast-Bot to say." },
                        { name: "r!clear *NUMBER*", value: "Choose how many messages you want to delete. Max is 100. **To use this command Roast-Bot needs to given Manage Messages permissions.**" },
                        { name: "r!server", value: "Info about your server." }
                    ],
                    footer: {
                        text: "Page 2 of 4."
                    }
                });

                const pageThreeEmbed = new Discord.RichEmbed({
                    title: pageOneEmbed.title,
                    color: 15427357,
                    fields: [
                        { name: "\n\nr!bot", value: "More info about Roast-Bot." },
                        { name: "r!feedback *feedbackMsg*", value: "`r!feedback` sends your feedback to me so I can improve Roast-Bot! If you are ever using Roast-Bot and a command isn't working or something else is wrong you can also report them here!" },
                        { name: "r!website", value: "The link to the Roast-Bot website!" }
                    ],
                    footer: {
                        text: "Page 3 of 4."
                    }
                });

                const pageFourEmbed = new Discord.RichEmbed({
                    title: pageOneEmbed.title,
                    color: 15427357,
                    fields: [
                        { name: "\n\n*Utilities:*\n\nXP-System", value: "Everytime you use a Roast-Bot command your XP increases! `Use r!level` to check your level and XP! Level 1: 0-9XP, Level 2: 10XP, Level 3: 15XP, Level 4: 25XP Level 5: 50XP, Level 6: 100XP, Level 7: 200XP, Level 8: 500XP, Level 9: 1,000XP, Level 10: 5,000XP" },
                        { name: "On-Off", value: "If you want to turn any command on/off just use `r!off commandName` to turn the command off. To turn a command back on use `r!on commandName`. *Note:* `r!help` and `r!invite` cannot be turned off." },
                        //{name: "Custom Prefix", value: "If you don't like Roast-Bot's prefix(r!) you can change it to anything you want by using `r!prefix newPrefix`. To view your prefix use `r!prefix`. The prefix by default is r!. **Note:** YOU CAN ONLY CHANGE YOUR PREFIX WITH `r!prefix newPrefix`. If you forget your prefix you can always change it with `r!prefix newPrefix` or view it with `r!prefix`."},
                        { name: "\n\n***Command Help:***", value: "If your still having trouble using a command you can use `r!commandName help` for more detailed help. If you still don't understand please join the support server." },
                        { name: "Roast-Bot Development Server", value: "If you still need help, have any questions or feedback join the Roast-Bot help server. \n \n https://discord.gg/fuDF42D \n\nv2.3.0, for release notes join the Roast-Bot help server." }
                    ],
                    footer: {
                        text: "Page 4 of 4."
                    }
                });

                collectorPageForward.on("collect", async (r) => {
                    if (first == true) {
                        page--;
                    }
                    if (page == 1) {
                        page++;
                        const notbot = message.author;
                        await r.remove(notbot);
                        await r.message.edit(pageTwoEmbed);
                    } else if (page == 2) {
                        page++;
                        const notbot = message.author;
                        await r.remove(notbot);
                        await r.message.edit(pageThreeEmbed);
                    } else if (page == 3) {
                        page++;
                        const notbot = message.author;
                        await r.remove(notbot);
                        await r.message.edit(pageFourEmbed);
                    } else if (page == 4) {
                        const notbot = message.author;
                        await r.remove(notbot);
                        return message.channel.send("You are at the max number of pages.");
                    }
                });

                collectorPageBackward.on("collect", async (r) => {
                    if (page == 2) {
                        page--;
                        const notbot = message.author;
                        await r.remove(notbot);
                        await r.message.edit(pageOneEmbed);
                    } else if (page == 1) {
                        const notbot = message.author;
                        await r.remove(notbot);
                        return message.channel.send("You can't go backwards if you're at page 1.");
                    } else if (page == 3) {
                        page--;
                        const notbot = message.author;
                        await r.remove(notbot);
                        await r.message.edit(pageTwoEmbed);
                    } else if (page == 4) {
                        page--;
                        const notbot = message.author;
                        await r.remove(notbot);
                        await r.message.edit(pageThreeEmbed);
                    }
                });
                collectorStop.on("collect", async (r) => {
                    await mReaction.message.clearReactions();
                    await collectorStop.stop();
                    await collectorPageBackward.stop();
                    await collectorPageForward.stop();
                });
            });
    }
};
