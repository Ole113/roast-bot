//https://kmcgamer.github.io/programming/discordhelp/

const Discord = require("discord.js");

const RC = require("reaction-core");
const RM = require("reaction-menu");
const handler = new RC.Handler();

exports.run = async (client, message) => {
    const pageOneEmbed = new Discord.RichEmbed({
        title: "Roast-Bot Help:",
        color: 15427357,
        fields: [
            { name: `\n\n*Commands:*\n\nr!help`, value: `List of Roast-Bot Commands(this message).` },
            { name: `r!roast *@user*, r!roast, or r!roast *roastNumber*`, value: "Generate a random roast with the number of roast it was." },
            { name: `r!search *whatToSearch*`, value: "Searches all the roasts and returns the results that have the *whatToSearch* in it."},
            { name: `r!meme, or r!meme *memeNumber*`, value: "Sends a meme to the current channel." },
            { name: `r!invite`, value: "Link to invite Roast-Bot to a server." }
        ],
        footer: {
            text: "Page 1 of 3."
        }
    });
    const pageTwoEmbed = new Discord.RichEmbed({
        title: pageOneEmbed.title,
        color: 15427357,
        fields: [
            { name: `\n\nr!user, or r!user *@user*`, value: `r!user returns stats about you, or the person you tagged. The stats include: current presence, user id, current game, when their account was created and more!` },
            { name: `r!urban *whatToSearch*`, value: "Search up anything on the Urban Dictionary!" },
            { name: `r!say *whatToSay*`, value: `To use this command use r!say and then what you want Roast-Bot to say.` },
            { name: `r!clear *NUMBER*`, value: "Choose how many messages you want to delete. Max is 100. **To use this command Roast-Bot needs to given Manage Messages permissions.**" },
            { name: `r!server`, value: "Info about your server." },
        ],
        footer: {
            text: "Page 2 of 3."
        }
    });

    const pageThreeEmbed = new Discord.RichEmbed({
        title: pageOneEmbed.title,
        color: 15427357,
        fields: [
            { name: `r!bot`, value: "More info about Roast-Bot." },
            { name: "\n\n***Command Help:***", value: `If your still having trouble using a command you can use *r!commandName help* for more detailed help. If you still don't understand please join the support server.` },
            { name: "Roast-Bot Development Server", value: "If you still need help, have any questions or feedback join the Roast-Bot help server. \n \n https://discord.gg/fuDF42D \n\nv2.3.0, for release notes join the Roast-Bot help server." }
        ],
        footer: {
            text: "Page 3 of 3."
        }
    });
    
    const pages = [
        pageOneEmbed,
        pageTwoEmbed,
        pageThreeEmbed,
    ];

    if (message.content.toLowerCase().startsWith(`r!help`)) {
        
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
            ];
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
