/*
*
*   Things to add to r!urban:
* ----------------------------
*  Make it so if the word is not found it will only say Word not found and wont send the other info of undefined.
*/

const urban = require("relevant-urban");
const Discord = require("discord.js");

exports.run = async (message) => {
    if (message.content.toLowerCase().startsWith("r!urban")) {
        let word = message.content;
        let args = word.slice(8, word.length);
        if (args == "") {
            return message.channel.send("**Please enter something to search up.**  <:roast_circle:474755210485563404>")
        }
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
}
