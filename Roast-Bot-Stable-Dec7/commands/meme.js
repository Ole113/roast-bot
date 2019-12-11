/*
*
*   Things to add to r!meme:
* ----------------------------
*
*/

const Discord = require("discord.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }

    if (message.content.toLowerCase().startsWith("r!")) {
        if (message.content.toLowerCase() === `r!meme help`) {
            return message.channel.send("**r!meme help:**\n\nr!meme has 2 ways that it can be used.  These 2 ways are as follows:\n**r!meme**\n**r!meme #memeNumber**\n\n**r!meme** will generate a random meme. You can put `r!meme `, notice the space and it will also generate a random meme the same as `r!meme` with no space would.\n\nExample:\nUSER: r!meme\nRoast-Bot: Meme #someNumber `a meme`\n\n**r!meme #memeNumber** is almost as simple as `r!meme`,  the only difference is that `memeNumber`, is which meme you want to be sent.\n\nExample:\nUSER:r!meme #12\nRoast-Bot: Meme #12`meme picture`\n\nStill having trouble with r!meme or have a suggestion? Join the support server:\nhttps://discordapp.com/invite/9y8yV42");
        }
        if ((message.content.toLowerCase().startsWith(`r!meme`) || message.content.toLowerCase() === "r!")) {
            const randomMemes = Math.ceil(Math.random() * 536);
            if (message.content.toLowerCase().startsWith(`r!meme #`) || message.content.toLowerCase().startsWith("r!meme #")) {
                let number2 = message.content.slice("r!".length + 6, message.content.length);
                let numberInt1 = parseInt(number2);
                if (numberInt1 > 536) {
                    return message.channel.send("Sorry that meme couldn't be found :(");
                }
                return message.channel.send(`Meme #${numberInt1} <:roast_circle:474755210485563404>`, { files: [`images/meme${numberInt1}.PNG`] });
            } else {
                return message.channel.send(`Meme #${randomMemes} <:roast_circle:474755210485563404>`, { files: [`images/meme${randomMemes}.PNG`] });
            }
        }
    }

};
