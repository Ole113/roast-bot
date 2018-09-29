/*
*
*   Things to add to rb!meme:
* ----------------------------
*
*/

const Discord = require("discord.js");

const prefix_file = require("../Database/prefix.json");

exports.run = async (message) => {
    if(message.content.toLowerCase() == prefix_file.prefix + "meme help"){
        return message.channel.send("**rb!meme help:**\n\nrb!meme has 2 ways that it can be used.  These 2 ways are as follows:\n**rb!meme**\n**rb!meme #memeNumber**\n\n**rb!meme** will generate a random meme. You can put `rb!meme `, notice the space and it will also generate a random meme the same as `rb!meme` with no space would.\n\nExample:\nUSER: rb!meme\nRoast-Bot: Meme #someNumber `a meme`\n\n**rb!meme #memeNumber** is almost as simple as `rb!meme`,  the only difference is that `memeNumber`, is which meme you want to be sent.\n\nExample:\nUSER:rb!meme #12\nRoast-Bot: Meme #12`meme picture`\n\nStill having trouble with rb!meme or have a suggestion? Join the support server:\nhttps://discordapp.com/invite/9y8yV42");
    }
    if (message.content.toLowerCase().startsWith("rb!meme")) {
        const random_memes = Math.ceil(Math.random() * 188);
        if (message.content.toLowerCase().startsWith("rb!meme #")) {
            let word2 = message.content;
            let number2 = word2.slice(8, word2.length);
            let number_int1 = parseInt(number2);
            if(number_int1 > 188){
                return message.channel.send("Sorry that meme couldn't be found :(");
            }
            return message.channel.send(`Meme #${number_int1} <:roast_circle:474755210485563404>`, { files: [`Images/meme${number_int1}.PNG`] })
        } else {
            return message.channel.send(`Meme #${random_memes} <:roast_circle:474755210485563404>`, { files: [`Images/meme${random_memes}.PNG`] })
        };
    }
}