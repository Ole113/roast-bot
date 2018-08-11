const Discord = require("discord.js");
const urban = require("urban");
module.exports.run = async(bot, message, args) => {
    if(args.length < 1) return message.channel.send("Please enter what you want to search up.")
    console.log(args.join(" "));
}

module.exports.help = {
    name: "urban"
}