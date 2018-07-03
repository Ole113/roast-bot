const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
   console.log("I am ready!");
});
client.on("message", message => {
   if(message.content.startsWith() == "!help") {
      return message.channel.send("Commands: **!info**, **!help**, **!roast @USERNAME** ");
   } else if(message.content.startsWith() == "!info"){

    let bicon = client.user.displayAvatarURL;
       let botembed = new Discord.RichEmbed()
       .setDescription("Roast-Bot Information")
       .setColor("#ff3300")
       .setThumbnail(bicon)
       .addField("Bot Name", "Roast-Bot");
       
       return message.channel.send(botembed);
   }
});
//message.reply
client.login(process.env.BOT_TOKEN);
