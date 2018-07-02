const Discord = require(“discord.js”);

const client = new Discord.Client();

 

client.on(“ready”, () => {

    console.log(“Ready”);

});

 

client.on(“message”, message => {

    if (message.content === '!help') {

       message.reply(“Commands: !info, !roast [PERSON], !help”);

       }

});


client.login(process.env.BOT_TOKEN);
