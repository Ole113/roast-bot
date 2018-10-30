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
        return message.channel.send("Poll started.")
        .then(async (reaction) => {
            reaction.react('👍').then(() => reaction.react('👎'));

            const filter = (reactions) => {
                return ['👍', '👎'].includes(reactions.emoji.name);
            };

            reaction.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === '👍') {
                        reaction.reply('you reacted with a thumbs up.');
                    }
                    else {
                        reaction.reply('you reacted with a thumbs down.');
                    }
                })
                .catch(collected => {
                    console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
                    reaction.reply('you didn\'t react with neither a thumbs up, nor a thumbs down.');
                });
        });

            //await reactions.react("◀");
            //await reactions.react("▶");


    }
}