const Discord = require("discord.js");
const client = new Discord.Client();

const mongoose = require("mongoose");
const testFile = require("./report.js");
const startingPoints = 0;
const startingLevel = 0;
mongoose.connect("mongodb://localhost/roast-bot-beta-test");

exports.run = async (message) => {
    if (message.author.bot) { return; }
    
    if(message.content.toLowerCase().startsWith("rb!test")) {
        const update = new testFile({
            _id: mongoose.Schema.Types.ObjectId,
            username: message.author.username,
            points: startingPoints++,
            level: startingLevel++
        });
        update.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));

        return message.reply("SUCCESS");
    }
}