/*
*
*   Things to add to r!help:
* ----------------------------
*
*/
//https://kmcgamer.github.io/programming/discordhelp/

const Discord = require("discord.js");

const RC = require("reaction-core");
const RM = require("reaction-menu");
const handler = new RC.Handler();
const prefixFile = require("../database/customPrefix/customPrefix.js");

exports.run = async (client, message) => {
    const pageOneEmbed = new Discord.RichEmbed({
        title: "Roast-Bot Help:",
        color: 15427357,
        fields: [
            { name: `\n\n*Commands:*\n\n${prefixFile.prefix}help`, value: `List of Roast-Bot Commands(this message).` },
            { name: `${prefixFile.prefix}roast *@user*, ${prefixFile.prefix}roast, or ${prefixFile.prefix}roast *roastNumber*`, value: "Generate a random roast with the number of roast it was." },
            { name: `${prefixFile.prefix}search *whatToSearch*`, value: "Searches all the roasts and returns the results that have the *whatToSearch* in it."},
            { name: `${prefixFile.prefix}meme, or ${prefixFile.prefix}meme *memeNumber*`, value: "Sends a meme to the current channel." },
            { name: `${prefixFile.prefix}invite`, value: "Link to invite Roast-Bot to a server." },
            { name: "Custom Prefix", value: "If you don't like Roast-Bot's prefix(r!) you can change it to anything you want by using `r!prefix newPrefix`. To view your prefix use `r!prefix`. The prefix by default is r!. **Note:** YOU CAN ONLY CHANGE YOUR PREFIX WITH `r!prefix newPrefix`. If you forget your prefix you can always change it with `r!prefix newPrefix` or view it with `r!prefix`." },
        ],
        footer: {
            text: "Page 1 of 4."
        }
    });
    const pageTwoEmbed = new Discord.RichEmbed({
        title: pageOneEmbed.title,
        color: 15427357,
        fields: [
            { name: `\n\n${prefixFile.prefix}user, or ${prefixFile.prefix}user *@user*`, value: `${prefixFile.prefix}user returns stats about you, or the person you tagged. The stats include: current presence, user id, current game, when their account was created and more!` },
            { name: `${prefixFile.prefix}urban *whatToSearch*`, value: "Search up anything on the Urban Dictionary!" },
            { name: `${prefixFile.prefix}say *whatToSay*`, value: `To use this command use ${prefixFile.prefix}say and then what you want Roast-Bot to say.` },
            { name: `${prefixFile.prefix}clear *NUMBER*`, value: "Choose how many messages you want to delete. Max is 100. **To use this command Roast-Bot needs to given Manage Messages permissions.**" },
            { name: `${prefixFile.prefix}server`, value: "Info about your server." },
            { name: "\n\n***Command Help:***", value: `If your still having trouble using a command you can use *${prefixFile.prefix}commandName help* for more detailed help. If you still don't understand please join the support server.` },
            { name: "Roast-Bot Development Server", value: "If you still need help, have any questions or feedback join the Roast-Bot help server. \n \n https://discord.gg/fuDF42D \n\nv2.3.0, for release notes join the Roast-Bot help server." }
        ],
        footer: {
            text: "Page 2 of 4."
        }
    });

    const pageThreeEmbed = new Discord.RichEmbed({
        title: pageOneEmbed.title,
        color: 15427357,
        fields: [
            { name: `\n\n${prefixFile.prefix}global leaderboard, ${prefixFile.prefix}server leaderboard`, value: "Shows the server or global leaders in XP." },
            { name: `${prefixFile.prefix}bot`, value: "More info about Roast-Bot." },
            { name: `${prefixFile.prefix}feedback *feedbackMsg*`, value: `${prefixFile.prefix}feedback sends your feedback to me so I can improve Roast-Bot! If you are ever using Roast-Bot and a command isn't working or something else is wrong you can also report them here!` },
            { name: `${prefixFile.prefix}website`, value: "The link to the Roast-Bot website!" },
            { name: "\n\n*Utilities:*\n\nXP-System", value: "Everytime you use a Roast-Bot command your XP increases! `Use r!level` to check your level and XP! Level 1: 0-9XP, Level 2: 10XP, Level 3: 15XP, Level 4: 25XP Level 5: 50XP, Level 6: 100XP, Level 7: 200XP, Level 8: 500XP, Level 9: 1,000XP, Level 10: 5,000XP" },
            { name: "On-Off", value: "If you want to turn any command on/off just use `r!off commandName` to turn the command off. To turn a command back on use `r!on commandName`. *Note:* `r!help` and `r!invite` cannot be turned off." }
        ],
        footer: {
            /**
             * CHANGE THIS ONCE PAGE 4 IS ADDED
             */
            text: "Page 3 of 3."
        }
    });
    const pageFourEmbed = new Discord.RichEmbed({
        title: pageOneEmbed.title,
        color: 15427357,
        fields: [


        ],
        footer: {
            text: "Page 4 of 4."
        }
    });

    const pages = [
        pageOneEmbed,
        pageTwoEmbed,
        pageThreeEmbed,
    ];

    if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}help`)) {
        
        let makeBtns = (menu) => {
            const buttons = [
                {
                    emoji: "1⃣",
                    run: (user, message) => {
                        menu.select(1).catch(console.error);
                    }
                },
                {
                    emoji: "2⃣",
                    run: (user, message) => {
                        menu.select(2).catch(console.error);
                    }
                },
                {
                    emoji: "3⃣",
                    run: (user, message) => {
                        menu.select(3).catch(console.error);
                    }
                },
                /*
                {
                    emoji: '4️⃣',
                    run: (user, message) => {
                        menu.select(4).catch(console.error);
                    }
                }
                */
            ]
            return buttons
        }
        let menu = new RM.Menu(message.channel, handler, { RM: { disable: { left: true, right: true } }, RC: { owner: message.author.id } });
        let btns = makeBtns(menu);
        for (let page of pages) {
            await menu.add(page).catch(console.error);
        }
        menu.send(btns).catch(console.error);
        
        client.on("messageReactionAdd", (messageReaction, user) => handler.handle(messageReaction, user));
    }

};