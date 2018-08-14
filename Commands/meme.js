

const Discord = require("discord.js");

exports.run = async (client, message) => {
    const random_memes = Math.ceil(Math.random() * 123);
    if(message.content.startsWith("r!meme #")){
        let word2 = message.content;
        let number2 = word2.slice(8, word2.length);
        let number_int1 = parseInt(number2);
        return message.channel.send(`Meme #${number_int1} <:roast_circle:474755210485563404>`, {files: [`Images/meme${number_int1}.PNG`]})
    } else { 
        return message.channel.send(`Meme #${random_memes} <:roast_circle:474755210485563404>`, {files: [`Images/meme${random_memes}.PNG`]})
    };

}