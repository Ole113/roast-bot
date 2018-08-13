const Discord = require("discord.js");
const urban = require("relevant-urban");

 exports.run = async(client, message, args) => {
    if(!args[0]) return message.channel.send("Please specify what you want to be searched.");
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
     message.channel.send(embed);
}