/*
*
*   Things to add to r!meme:
* ----------------------------
*
*/

const Discord = require("discord.js");

exports.run = async (message) => {
    if(message.content.toLowerCase() == "rb!meme help"){
        return message.channel.send("**r!meme help:**\n\nr!meme has 2 ways that it can be used.  These 2 ways are as follows:\n**r!meme**\n**r!meme #memeNumber**\n\n**r!meme** will generate a random meme. You can put `r!meme `, notice the space and it will also generate a random meme the same as `r!meme` with no space would.\n\nExample:\nUSER: r!meme\nRoast-Bot: Meme #someNumber `a meme`\n\n**r!meme #memeNumber** is almost as simple as `r!meme`,  the only difference is that `memeNumber`, is which meme you want to be sent.\n\nExample:\nUSER:r!meme #12\nRoast-Bot: Meme #12`meme picture`\n\nStill having trouble with r!meme or have a suggestion? Join the support server:\nhttps://discordapp.com/invite/9y8yV42");
    }
    if (message.content.toLowerCase().startsWith("rb!meme")) {
        const random_memes = Math.ceil(Math.random() * 159);
        if (message.content.toLowerCase().startsWith("rb!meme ")) {
            let word2 = message.content;
            let number2 = word2.slice(7, word2.length);
            let number_int1 = parseInt(number2);
            if(number_int1 > 159){
                return message.channel.send("Sorry that meme couldn't be found :(");
            }
            return message.channel.send(`Meme #${number_int1} <:roast_circle:474755210485563404>`, { files: [`Images/meme${number_int1}.PNG`] })
        } else {
            return message.channel.send(`Meme #${random_memes} <:roast_circle:474755210485563404>`, { files: [`Images/meme${random_memes}.PNG`] })
        };
    }

}