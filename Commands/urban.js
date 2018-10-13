/*
*
*   Things to add to rb!urban:
* ----------------------------
*  Remove brackets with message.content.replace(whatever the syntax is);
*  Make it so if the word is not found it will only say Word not found and wont send the other info of undefined.
*/

const urban = require("relevant-urban");
const Discord = require("discord.js");

const prefixFile = require("../Database/prefix.json");
const onOffFile = require("../Database/on-off.json");

exports.run = async (message) => {
    if (message.author.bot) return;
    if (message.content.toLowerCase() == prefixFile.prefix + "urban help") {
        return message.channel.send("**rb!urban help**:\n\nUnlike some other commands rb!urban only has 1 usage. To use rb!urban you only need to specify one thing, what to search.\n\nExample:\n\nUSER: rb!urban test\nRoast-Bot: \n*test*\nDefinition:\n1. the main cause of [explosions].\n2. any thing [dreaded] that your \"teachers\" say is \"good\" for you. soon after, you explode for no reason.\n3. what scientists do to make stuff explode.\n4. when a sheet of paper explodes into [flames].\n\nExample:\n\n1. test [sodium] and water.\n2. SAT is a test.\n3. [Monkeys].\n4. you brought your [lighter] to test.\nAuthor:\nmonn-unit\nRating:\nUpvotes: :thumbsup: 126 | Downvotes: :thumbsdown: 35*\n\nStill having trouble with rb!meme or have a suggestion? Join the support server:\nhttps://discordapp.com/invite/9y8yV42");
    }
    if (message.content.toLowerCase().startsWith(prefixFile.prefix + "urban") && onOffFile.urban == "on") {
        let word = message.content;
        let args = word.slice(prefixFile.prefix.length + 5, word.length);
        if (args == "") {
            return message.channel.send("**Please enter something to search up.**  <:roast_circle:474755210485563404>")
        }
        let res = await urban(args).catch((e) => {
            return message.channel.send("**Word not found :(  <:roast_circle:474755210485563404>**")
        });
        const urbanEmbed = new Discord.RichEmbed()
            .setColor("#EB671D")
            .setTitle(res.word)
            .setURL(res.urbanURL)
            .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n${res.example}`)
            .addField("Author:", res.author, true)
            .addField("Rating:", `**Upvotes: :thumbsup:** ${res.thumbsUp} | **Downvotes: :thumbsdown:** ${res.thumbsDown}`);

        return message.channel.send({embed: urbanEmbed});
    } else if(message.content.toLowerCase().startsWith(prefixFile.prefix + "urban") && onOffFile.urban == "off") {
        return message.channel.send("This command has been turned off.");   
    }
};