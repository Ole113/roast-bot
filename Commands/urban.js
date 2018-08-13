const urban = require("relevant-urban");
const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = async(client, message, args) => {
    let res = await urban(args);
    if(!res) { return message.channel.send("**Word not found :(  <:roast_circle:474755210485563404>**") }

    const urban_embed = new Discord.RichEmbed()
        .setColor("#EB671D")
        .setTitle(res.word)
        .setURL(res.urbanURL)
        .setDescription(`Definition:\n*${res.definition}*\n\n**Example:**\n${res.example}`)
        .addField("Author:", res.author, true)
        .addField("Rating:", `**Upvotes: :thumbsup:** ${res.thumbsUp} | **Downvotes: :thumbsdown:** ${res.thumbsDown}`);

    return message.channel.send(urban_embed);
}