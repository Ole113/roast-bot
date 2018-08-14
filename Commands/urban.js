/*
*
*   Things to add to r!urban:
* ----------------------------
*  Remove brackets with message.content.replace(whatever the syntax is);
*
*/

const urban = require("relevant-urban");
const Discord = require("discord.js");

exports.run = async(message, args) => {
    let res = await urban(args).catch(e => {
        return message.channel.send("**Word not found :(  <:roast_circle:474755210485563404>**")
    });

    const urban_embed = new Discord.RichEmbed()
        .setColor("#EB671D")
        .setTitle(res.word)
        .setURL(res.urbanURL)
        .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n${res.example}`)
        .addField("Author:", res.author, true)
        .addField("Rating:", `**Upvotes: :thumbsup:** ${res.thumbsUp} | **Downvotes: :thumbsdown:** ${res.thumbsDown}`);

    return message.channel.send(urban_embed);
}