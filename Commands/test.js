const test = require("../Database/on-off.json");
const prefix_file = require("../Database/on-off.js");

exports.run = async (message) => {
    if(message.content.toLowerCase().startsWith(prefix_file.prefix + "test") && test.meme == "on") {
        return message.channel.send(`${test.meme} is turned on yay`);
    }
}