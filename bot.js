const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
   console.log("I am ready!");
});
client.on("message", message => {
   if(message.content === "!help") {
      message.channel.send("Commands: **!info**, **!help**, **!roast @USERNAME** ");
   }else if(message.context === "!info") {
      message.channel.send("Roast-Bot was created by Ole113 on 2018-06-26 and is version BETA 1.0.2. For more information visit https://github.com/Ole113/Roast-Bot");
   }
   
});
//message.reply
client.login(process.env.BOT_TOKEN);
