/*
*
*   Things to add to r!poll:
* ----------------------------
*
*/

const Discord = require("discord.js");

const prefixFile = require("../Database/prefix.json");

exports.run = async (client, message) => {
    if (message.author.bot) { return; }
    if (message.content.toLowerCase().startsWith(prefixFile.prefix + "poll")) {

        const pageOneEmbed = new Discord.RichEmbed({
            title: "Roast-Bot Help:",
            color: 15427357,
            fields: [
                { name: "\n\n*Commands:*\n\nr!help", value: "List of Roast-Bot Commands." },
                { name: "r!roast *@user*, r!roast, or r!roast *roastNumber*", value: "Generate a random roast with the number of roast it was." },
                { name: "r!meme, or r!meme *memeNumber*", value: "Sends a meme to the current channel." },
                { name: "r!urban *whatToSearch*", value: "Search up anything on the Urban Dictionary!" },
                { name: "r!invite", value: "Link to invite Roast-Bot to a server." },
            ]
        });
        message.channel.send(pageOneEmbed)
            .then(async mReaction => {
            });
    }
};
