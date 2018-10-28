/*
*
*   Things to add to rb!meme:
* ----------------------------
*
*/

const Discord = require("discord.js");

const prefixFile = require("../Database/prefix.json");
const onOffFile = require("../Database/on-off.json");

exports.run = async (message) => {
    if (message.author.bot) { return; }
    if(message.content.toLowerCase() === prefixFile.prefix + "meme help"){
        return message.channel.send("**rb!meme help:**\n\nrb!meme has 2 ways that it can be used.  These 2 ways are as follows:\n**rb!meme**\n**rb!meme #memeNumber**\n\n**rb!meme** will generate a random meme. You can put `rb!meme `, notice the space and it will also generate a random meme the same as `rb!meme` with no space would.\n\nExample:\nUSER: rb!meme\nRoast-Bot: Meme #someNumber `a meme`\n\n**rb!meme #memeNumber** is almost as simple as `rb!meme`,  the only difference is that `memeNumber`, is which meme you want to be sent.\n\nExample:\nUSER:rb!meme #12\nRoast-Bot: Meme #12`meme picture`\n\nStill having trouble with rb!meme or have a suggestion? Join the support server:\nhttps://discordapp.com/invite/9y8yV42");
    }
    if (message.content.toLowerCase().startsWith(prefixFile.prefix + "meme") && onOffFile.meme === "on") {
        const randomMemes = Math.ceil(Math.random() * 353);
        if (message.content.toLowerCase().startsWith(prefixFile.prefix + "meme #")) {
            let word2 = message.content;
            let number2 = word2.slice(prefixFile.prefix.length + 6, word2.length);
            let numberInt1 = parseInt(number2);
            if(numberInt1 > 353){
                return message.channel.send("Sorry that meme couldn't be found :(");
            }
            return message.channel.send(`Meme #${numberInt1} <:roast_circle:474755210485563404>`, { files: [`Images/meme${numberInt1}.PNG`] });
        } else {
            return message.channel.send(`Meme #${randomMemes} <:roast_circle:474755210485563404>`, { files: [`Images/meme${randomMemes}.PNG`] });
        }
    } else if(message.content.toLowerCase().startsWith(prefixFile.prefix + "meme") && onOffFile.meme === "off") {
        return message.channel.send("This command has been turned off by an administrator.");      
    }
};