/*
*
*   Things to add to rb!user:
* ----------------------------
*  XP and level and how close they are to the next level.
*/

const Discord = require("discord.js");
const client = new Discord.Client();

const { prefixFile } = require("../database/custom-prefix.js");
const { onOff } = require("../database/on-off.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }

    const key = message.guild.id;

    if (message.content.toLowerCase() === prefixFile.get(key, "prefix") + "user help") {
        return message.channel.send("**rb!user help**\n\n`rb!user` has 2 ways that it can be used. The first being `rb!user` which will return stats about you such as when your account was created, your presence(online, offline etc), user id, and your current game. The second way is `rb!user @user`. This way returns the stats of whoever you tagged. The returned stats are the same.\n\nExample 1:\n\nUSER: rb!user\nRoast-Bot: Account created on.... current game.... user id.... and so forth.\n\nExample 2:\n\nUSER: rb!user @Roast-Bot\nRoast-Bot: Account created on.... current game.... user id.... and so forth.\n\n*Note:* You can also see multiple people\'s stats by doing `rb!user @user1 @user2` and so forth depending on how many people you want to tag.\n\n\nStill having trouble with `rb!user` or have a suggestion? Join the support server: https://discordapp.com/invite/9y8yV42");
    }
    if (message.content.toLowerCase().startsWith(prefixFile.get(key, "prefix") + "user ") && onOff.get(key, "user") === "on") {
        var muser = message.mentions.users;

        muser.forEach(function (users) {
            var statuss = "default";
            switch (users.presence.status) {
                case "online":
                    statuss = "<:online:493891715678339089>  Online";
                    break;
                case "offline":
                    statuss = "<:invisible:493897783179214858>  Offline";
                    break;
                case "idle":
                    statuss = "<:idle:493892777944285194>  Idle";
                    break;
                case "dnd":
                    statuss = "<:dnd:493892741613355008>  Do Not Disturb";
                    break;
            }

            var gamee = 0;
            if (users.presence.game === null) {
                gamee = "None";
            } else {
                gamee = users.presence.game;
            }

            let userEmbed = new Discord.RichEmbed()
                .setColor("#EB671D")
                .setTitle(`${users.username}'s Stats:`)
                .setThumbnail(users.displayAvatarURL)
                .addField("Account created at: ", users.createdAt.toString())
                .addField("User Id:", users.id)
                .addField("Current Game:", gamee)
                .addField("Bot:", users.bot.toString())
                .addField("Current Presense:", statuss);
            return message.channel.send({ embed: userEmbed });


        });
    } else if(message.content.toLowerCase().startsWith(prefixFile.get(key, "prefix") + "user ") && onOff.get(key, "user") === "off") {
        return message.channel.send("This command has been turned off by an administrator.");      
    }

    if (message.content.toLowerCase() === prefixFile.get(key, "prefix") + "user" && onOff.get(key, "user") === "on") {
        var status = "default";
        switch (message.author.presence.status) {
            case "online":
                status = "<:online:493891715678339089>  Online";
                break;
            case "offline":
                status = "<:invisible:493897783179214858>  Offline";
                break;
            case "idle":
                status = "<:idle:493892777944285194>  Idle";
                break;
            case "dnd":
                status = "<:dnd:493892741613355008>  Do Not Disturb";
                break;
        }
        var game = 0;
        if (message.author.presence.game === null) {
            game = "None";
        } else {
            game = message.author.presence.game;
        }
        let userEmbed = new Discord.RichEmbed()
            .setColor("#EB671D")
            .setTitle(`${message.author.username}'s Stats:`)
            .setThumbnail(message.author.displayAvatarURL)
            .addField("Account created at: ", message.author.createdAt.toString())
            .addField("User Id:", message.author.id)
            .addField("Current Game:", game)
            .addField("Bot:", message.author.bot)
            .addField("Current Presense:", status);
        return message.channel.send({ embed: userEmbed });

    } else if(message.content.toLowerCase() === prefixFile.get(key, "prefix") + "user" && onOff.get(key, "user") === "off") {
        return message.channel.send("This command has been turned off by an administrator.");      
    }
};