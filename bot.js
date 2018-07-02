const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
   console.log("I am ready!");
});
client.on("message", message => {
   if(message.content === "!help") {
      message.reply("Commands: !info, !help, !roast @PERSONS_NAME");
   }
});

client.login(process.env.BOT_TOKEN);
