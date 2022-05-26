const Discord = require("discord.js");

const roastFile = require("./roast.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }

    if (message.content.toLowerCase().startsWith(`r!search `)) {
        let searchParam = message.content.slice("r!".length + 7, message.content.length);
        let found = ""
        let totalLength = 0;

        for (let i = 0; i < roastFile.roasts.length; i++) {
            if (roastFile.roasts[i].roast.includes(searchParam)) {
                totalLength += roastFile.roasts[i].roast.length;
                found += roastFile.roasts[i].roast + "\n";
            }
        }

        if (totalLength > 2000) {
            return message.channel.send(`There were too many roasts found that have *${searchParam}* in them, try being more specific.`);
        }

        return message.channel.send(`**Results:** \n\n${found}`);
    }

};
