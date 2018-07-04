const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
   console.log("Ready");
});
client.on("message", message => {
   if(message.content.startsWith("!help")) {
      return message.channel.send("Commands: **!info**, **!help**, **!roast @USERNAME** ");
   } else if(message.content.startsWith("!info")){
        return message.channel.send("Roast-Bot was created on 2018-06-26 by Ole113. For more information visit https://github.com/Ole113/Roast-Bot");
    /*let bicon = client.user.displayAvatarURL;
       let botembed = new Discord.RichEmbed()
       .setDescription("Roast-Bot Information")
       .setColor("#ff3300")
       .setThumbnail(bicon)
       .addField("Bot Name", "Roast-Bot");
       
       return message.channel.send(botembed);
       */
   } else if (message.content === "!roast") {
       const sayMessage = args.join("test");
       message.channel.send(client.users.find('username', sayMessage).toString());
}
});
//message.reply
client.login(process.env.BOT_TOKEN);
