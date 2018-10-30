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
        
        message.channel.send(embed)
        .then(msg => msg.react("✅"))
        .then(mReaction => mReaction.message.react("❎") )
        .then(mReaction => {
            const collectorPageUp = mReaction.message
                .createReactionCollector(reactionFilter, { time: 15000 });
            
            if(page == 1) {
            collectorPageUp.on("collect", r => {
                const pageTwoEmbed = new Discord.RichEmbed({
                    title: embed.title,
                    color: 15427357,
                    fields: [ 
                        {name: "test name page 2", value: "test value"}
                    ]
                });
                
                r.message.edit(pageTwoEmbed)
            } else if(page == 2) {
                const pageThreeEmbed = new Discord.RichEmbed({
                    title: embed.title,
                    color: 15427357,
                    fields: [ 
                        {name: "test name page 3", value: "test value"}
                    ]
                });
                r.message.edit(pageThreeEmbed)
            }
            });
        });
    }
}
