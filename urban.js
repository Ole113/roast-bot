const Discord = require("discord.js");
const urban = require("relevant-urban");

exports.run = async(client, message, args, tools) => {

    let res = await urban(args.join(" ")).catch(e => {
        return message.channel.send("Sorry, that word wasn't found.");
    })

    const embed = new Discord.MessageEmbed()
    .setColor("#EB671D")
    .setTitle(res.word)
    .setURL(res.urbanURL)
    .setDescription(`**Definition:**\n *${res.definition}*\n\n**Example:**\n*${res.example}*`)
    .addField("Author", res.author, true)
    .addField("Rating", `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`)

    if(res.tags.length > 0 && res.tags.join(" ").length < 1024) {
        embed.addField("Tags", res.tags.join(", "), true)
    }

    return message.channel.send(embed);
} 