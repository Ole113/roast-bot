/*
*
*   Things to add to r!poll:
* ----------------------------
*
*/

const Discord = require("discord.js");

const prefixFile = require("../Database/prefix.json");

exports.run = async (message) => {
    let page = 1;
    
    if (message.content.toLowerCase().startsWith(prefixFile.prefix + "poll")) {
        const reactionFilter = (reaction, user) => reaction.emoji.name === "✅";
        
        const embed = new Discord.RichEmbed({
            title: "Roast-Bot Help:",
            color: 15427357,
            fields: [
                {name: "\n\n*Commands:*\n\nr!help", value: "List of Roast-Bot Commands."},
                {name: "r!roast *@user*, r!roast, or r!roast *roastNumber*", value: "Generate a random roast with the number of roast it was."},
                {name: "r!meme, or r!meme *memeNumber*", value: "Sends a meme to the current channel."},
                {name: "r!urban *whatToSearch*", value: "Search up anything on the Urban Dictionary!"},
                {name: "r!invite", value: "Link to invite Roast-Bot to a server."},
                //{name: "r!server", value: "Info about your server."},
                //{name: "r!bot", value: "Learn more about Roast-Bot."},
                //{name: "", value: ""},
                //{name: "", value: ""},
                //{name: "", value: ""},
                //{name: "", value: ""},
                //{name: "", value: ""},
                //{name: "", value: ""},
            ],
            footer: {
                text: "Page 1 of 5."
            }
        });
        page++;
        message.channel.send(embed)
        .then(msg => msg.react("✅"))
        .then(mReaction => mReaction.message.react("❎") )
        .then(mReaction => {
            const collectorPageUp = mReaction.message
                .createReactionCollector(reactionFilter, { time: 15000 });
            
            collectorPageUp.on("collect", r => {
                const pageTwoEmbed = new Discord.RichEmbed({
                    title: embed.title,
                    color: 15427357,
                    fields: [ 
                        {name: "r!user, or r!user *@user*", value: "r!user returns stats about you, or the person you tagged. The stats include: current presence, user id, current game, when their account was created and more!"},
                        {name: "r!say *whatToSay*", value: "To use this command use `r!say ` and then what you want Roast-Bot to say."},
                        {name: "r!clear *NUMBER*", value: "Choose how many messages you want to delete. Max is 100. **To use this command Roast-Bot needs to given Manage Messages permissions.**"},
                        {name: "r!server", value: "Info about your server."}
                    ],
                    footer: {
                        text: "Page 2 of 5."
                    }
                });
                r.message.edit(pageTwoEmbed)
            });
            
            /* else if(page == 2) {
                const pageThreeEmbed = new Discord.RichEmbed({
                    title: embed.title,
                    color: 15427357,
                    fields: [ 
                        {name: "r!bot", value: "More info about Roast-Bot."},
                        {name: "r!feedback *feedbackMsg*", value: "`r!feedback` sends your feedback to me so I can improve Roast-Bot! If you are ever using Roast-Bot and a command isn't working or something else is wrong you can also report them here!"}
                    ]
                });
            } */
        });
    }
}
