/*
*
*   Things to add to r!poll:
* ----------------------------
*
*/

const Discord = require("discord.js");

const prefixFile = require("../Database/prefix.json");

exports.run = async (message) => {
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
        
        // add reaction emoji to message
        message.channel.send(embed)
        .then(msg => msg.react("✅"))
        .then(mReaction => mReaction.message.react("❎") )
        .then(mReaction => {
            // createReactionCollector - responds on each react, AND again at the end.
            const collector = mReaction.message
                .createReactionCollector(reactionFilter, { time: 15000 });
        
            // set collector events
            collector.on("collect", r => {
                // immutably copy embed"s Like field to new obj
                let embedField0 = Object.assign({}, embed.fields[0]);
        
                // update "field" with new value
                embedField0.name = "r!server";
                embedField0.value = "Info about your server.";
        
                // create new embed with old title & description, new field
                const newEmbed = new Discord.RichEmbed({
                    title: embed.title,
                    color: 15427357,
                    fields: [ 
                        {name: "test name", value: "test value"}
                    ]
                });
        
                // edit message with new embed
                // NOTE: can only edit messages you author
                r.message.edit(newEmbed)
            });
        });
    }
}
