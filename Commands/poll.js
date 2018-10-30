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

        const pollEmbed = new Discord.RichEmbed()
            .setColor("#EB671D")
            .setTitle("Roast-Bot Help:")
            .addBlankField()
            .addField("Option 1:", "Yes")
            .addField("Option 2:", "No")
            .addField("Option 3:", "Maybe")
            .setFooter("Vote by clicking on a reaction.")

        message.channel.send(pollEmbed)
            .then((msg) => msg.react("✅"))
            .then((mReaction) => mReaction.message.react("❎"))
            .then(mReaction => {
                const collector = mReaction.message
                    .createReactionCollector(reactionFilter, { time: 15000 });

                collector.on("collect", r => {
                    let embedLikeField = Object.assign({}, embed.fields[0]);

                    embedLikeField.value = "<3 <3 <3";

                    const newEmbed = new Discord.RichEmbed()
                        .setColor("#EB671D")
                        .setTitle("Roast-Bot Help:")
                        .addBlankField()
                        .addField("YESSS", "worked")

                    r.message.edit(newEmbed);
                    //await reactions.react("◀");
                    //await reactions.react("▶");
                });
            });
    }
}