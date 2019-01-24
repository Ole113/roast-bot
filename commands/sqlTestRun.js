const Discord = require("discord.js");

const sqlTestFile = require("../database/sqlXPTest.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }
    
    if(message.content.toLowerCase().startsWith("rb!")) {
        sqlTestFile.run(message);
    }
}