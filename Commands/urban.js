const urban = require("relevant-urban");
const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = async(client, message, args) => {
    let res = await urban(args).catch(e => {
        return mesage.channel.send("**Word not found**")
    });

    const urban_embed = new Discord.RichEmbed()
        .setColor("#EB671D")
        .setTitle(res.word)
        .setURL(res.urbanURL)
        .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n${res.example}`)
        .addField("Author:", res.author, true)
        .addField("Rating:", `**Upvotes:** ${res.thumbsUp} | **Downvotes:** ${res.thumbsDown}`)

    /*if(res.tags.length > 0 && res.tags.length < 1024) {
        urban_embed.addField("Tags", res.tags.join(", "), true)
    } */

    return message.channel.send(urban_embed);
}