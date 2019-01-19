const Discord = require("discord.js");

const sqlTestFile = require("../database/sqlXPTest.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }
    
    if(message.content.toLowerCase().startsWith("r!test")) {
        sqlTestFile.run(message);
        sqlTestFile.user.xp++;
        console.log(sqlTestFile.user.xp);
    }
}