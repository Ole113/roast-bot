/*
*
*   Things to add to r!poll:
* ----------------------------
*
*/

const Discord = require("discord.js");

const prefixFile = require("../Database/prefix.json");

exports.run = async (message) => {
    if(message.content.toLowerCase().startsWith(prefixFile.prefix + "poll")) {
        return message.channel.send("Poll started.").then(async (reactions) => {

            await reactions.react("");
            await reactions.react("");

            const filter = (reaction) => {
                return ["⏪", "◀", "▶", "⏩", "⏹", "🔢"].includes(reaction.emoji.name);
            };
           
            reactions.awaitReactions(filter)
                .then(collected => {

                    if (reactionTwo.emoji.name === "▶") {
                        console.log("collected right");                    }
                });
        });
        /*
        let pollEmbed = new Discord.RichEmbed()
            .setColor("#EB671D")
            .setTitle(`Poll Started by ${message.author}`);
        return message.channel.send({ embed: pollEmbed });
        */
    }
}