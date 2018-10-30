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
            title: "Suggestion by someone",
            description: "This is a test suggestion. Can you please like it or dislike it :)",
            fields: [
                {name: "Like:", value: "<3"},
                {name: "a test", value: "test"}
            ]
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
                let embedLikeField = Object.assign({}, embed.fields[0]);
        
                // update "field" with new value
                embedLikeField.value = "<3 <3 <3";
        
                // create new embed with old title & description, new field
                const newEmbed = new Discord.RichEmbed({
                    title: embed.title,
                    description: embed.description,
                    fields: [ embedLikeField ]
                });
        
                // edit message with new embed
                // NOTE: can only edit messages you author
                r.message.edit(newEmbed)
            });
        });
    }
}