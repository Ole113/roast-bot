/*
*
*   Things to add to r!help:
* ----------------------------
*
*/

const Discord = require("discord.js");

const prefixFile = require("../Database/prefix.json");

exports.run = async (client, message) => {
    if (message.author.bot) { return; }
    if (message.content.toLowerCase().startsWith(prefixFile.prefix + "help")) {
        let page = 1;
        let test = "one";
        const pageForward = (reaction) => reaction.emoji.name === "▶";
        const pageBackward = (reaction) => reaction.emoji.name === "◀";
        const doublePageForward = (reaction) => reaction.emoji.name === "⏭";
        const doublePageBackward = (reaction) => reaction.emoji.name === "⏪";
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
            .then(msg => msg.react("⏪"))
            .then(mmReaction => mmReaction.message.react("◀"))
            .then(mmmReaction => mmmReaction.message.react("⏹"))
            .then(mmmReaction => mmmReaction.message.react("▶"))
            .then(mmmmReaction => mmmmReaction.message.react("⏩"))
            .then(async mReaction => {
                /*
                await mReaction.react("⏪");
                await mReaction.react("◀");
                await mReaction.react("⏹");
                await mReaction.react("▶");
                await mReaction.react("⏩");
                await mReaction.react("⏭");
                await mReaction.react("🔢");
                */
                const collectorPageForward = mReaction.message
                    .createReactionCollector(pageForward);
                const collectorPageBackward = mReaction.message
                    .createReactionCollector(pageBackward);
                const collectorStop = mReaction.message
                    .createReactionCollector(stop);
                const collectorDoubleForward = mReaction.message
                    .createReactionCollector(doublePageForward);
                const collectorDoubleBackward = mReaction.message
                    .createReactionCollector(doublePageBackward);
            
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
                        { name: "Roast-Bot Development Server", value: "If you still need help, have any questions or feedback join the Roast-Bot help server. \n \n https://discord.gg/fuDF42D \n\nv2.2.0, for release notes join the Roast-Bot help server." }
                    ],
                    footer: {
                        text: "Page 4 of 4."
                    }
                });
                collectorPageForward.on("collect", (r) => {
                    if (page == 1) {
                        page++;
                        r.message.edit(pageTwoEmbed);
                    } else if (page == 2) {
                        page++;
                        r.message.edit(pageThreeEmbed);
                    } else if (page == 3) {
                        page++;
                        r.message.edit(pageFourEmbed);
                    } else if (page == 4) {
                        return message.channel.send("You are at the max number of pages.");
                    }
                });
                collectorPageBackward.on("collect", (r) => {
                    if (page == 2) {
                        page--;
                        mReaction.reactions.remove(message.author);
                        //mReaction.message.clearReactions();
                        r.message.edit(pageOneEmbed);
                    } else if (page == 1) {
                        return message.channel.send("You can't go backwards if your at page 1.");
                    } else if (page == 3) {
                        page--;
                        r.message.edit(pageTwoEmbed);
                    } else if (page == 4) {
                        page--;
                        r.message.edit(pageThreeEmbed);
                    }
                });
                collectorStop.on("collect", (r) => {
                    mReaction.message.clearReactions();
                });
                collectorDoubleForward.on("collect", (r) => {
                    if (page == 1)  {
                        page += 2;
                        r.message.edit(pageThreeEmbed);
                    } else if (page == 2) {
                        page += 2;
                        r.message.edit(pageFourEmbed);
                    } else if (page == 3 || page == 4) {
                        return message.channel.send("You can't skip forward that many pages ahead.");
                    }
                });
                collectorDoubleBackward.on("collect", (r) => {
                    if (page == 1 || page == 2) {
                        return message.channel.send("You can't skip backward that many pages ahead.");
                    } else if (page == 3) {
                        page -= 2;
                        r.message.edit(pageOneEmbed);
                    } else if (page == 4) {
                        page -= 2;
                        r.message.edit(pageTwoEmbed);
                    }
                });
            });
    }
    /*
    if (message.content.toLowerCase() === prefixFile.prefix + "help") {
        let helpIcon = client.user.displayAvatarURL;
        let helpEmbed = new Discord.RichEmbed()
            .setColor("#EB671D")
            .setTitle("Roast-Bot Help:")
            .addBlankField()
            .setThumbnail(helpIcon)
            .addField("***Commands:***\n\nr!help", "List of Roast-Bot Commands.")
            .addField("r!bot", "Learn more about Roast-Bot.")
            .addField("r!roast *@user*, r!roast, or r!roast *roastNumber*", "Generate a random roast with the number of roast it was.")
            .addField("r!invite", "Link to invite Roast-Bot to a server.")
            .addField("r!server", "Info about your server.")
            .addField("r!meme, or r!meme *memeNumber*", "Sends a meme to the current channel.")
            .addField("r!clear *NUMBER*", "Choose how many messages you want to delete. Max is 100. **To use this command Roast-Bot needs to given Manage Messages permissions.**")
            .addField("r!say *whatToSay*", "To use this command use `r!say ` and then what you want Roast-Bot to say.")
            .addField("r!urban *whatToSearch*", "Search up anything on the Urban Dictionary!")
            .addField("r!user, or r!user *@user*", "r!user returns stats about you, or the person you tagged. The stats include: current presence, user id, current game, when their account was created and more!")
            .addField("r!feedback *feedbackMsg*", "`r!feedback` sends your feedback to me so I can improve Roast-Bot! If you ever are using Roast-Bot and a command isn't working or something else is wrong you can also report them here.")
            .addField("r!website", "The link to the Roast-Bot website!")
            .addBlankField()
            .addField("***Utilities:***\n\nXP-System", "Everytime you use a Roast-Bot command your XP increases! `Use r!level` to check your level and XP! Level 1: 0-9XP, Level 2: 10XP, Level 3: 15XP, Level 4: 25XP Level 5: 50XP, Level 6: 100XP, Level 7: 200XP, Level 8: 500XP, Level 9: 1,000XP, Level 10: 5,000XP")
            .addField("Custom Prefix", "If you don't like Roast-Bot's prefix(r!) you can change it to anything you want by using `r!prefix newPrefix`. To view your prefix use `r!prefix`. The prefix by default is r!. **Note:** YOU CAN ONLY CHANGE YOUR PREFIX WITH `r!prefix newPrefix`. If you forget your prefix you can always change it with `r!prefix newPrefix` or view it with `r!prefix`.")
            .addField("On-Off", "If you want to turn any command on/off just use `r!off commandName` to turn the command off. To turn a command back on use `r!on commandName`. *Note:* `r!help` and `r!invite` cannot be turned off.")
            .addBlankField()
            .addField("***Command Help:***", "If your still having trouble using a command you can use `r!commandName help` for more detailed help. If you still don't understand please join the support server.")
            .addBlankField()
            .addField("Roast-Bot Development Server:", "If you still need help, have any questions or feedback join the Roast-Bot help server. \n \n https://discord.gg/fuDF42D \n\n")
            .setFooter("v2.2.0, for release notes join the Roast-Bot help server. ");
        return message.channel.send({ embed: helpEmbed });
    } */
};
