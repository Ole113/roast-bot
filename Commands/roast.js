/*
*
*   Things to add to r!roast:
* ----------------------------
*  More roasts
*
*/

const Discord = require("discord.js");

exports.run = async (message) => {
    if (message.content === "r!roast") {
        const random_roasts = Math.ceil(Math.random() * 108);
        return message.channel.send(roasts[random_roasts - 1].roast + `\n **Roast #${random_roasts}** <:roast_circle:474755210485563404>`);
    } else if (message.content.startsWith("r!roast ")) {
        const random = Math.ceil(Math.random() * 108);
        const word = message.content;
        const reply = word.slice(8, word.length);
        if (message.content.startsWith("r!roast #")) {
            let word1 = message.content;
            let number1 = word1.slice(9, word1.length);
            let number_int = parseInt(number1);
            return message.channel.send(roasts[number_int - 1].roast + `\n **Roast #${number_int}** <:roast_circle:474755210485563404>`);
        }

        return message.channel.send(reply + ", " + roasts[random - 1].roast + `\n **Roast #${random}** <:roast_circle:474755210485563404>`);
    }
}