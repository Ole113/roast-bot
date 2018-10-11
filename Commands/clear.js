/*
*
*   Things to add to rb!clear:
* ----------------------------
*  NEED TO TEST: Make it so it deletes the exact number of messages.
*  Make it so if someone passes "rb!clear abc" it will give an error AND UPDATE rb!CLEAR HELP DOCS
*/

const Discord = require("discord.js");

const prefix_file = require("../Database/prefix.json");
const on_off_file = require("../Database/on-off.json");

exports.run = async (message) => {
    if (message.author.bot) return;
    const word = message.content;
    const number = word.slice(prefix_file.prefix.length + 5, word.length);
    const int = Number(number);
    if (message.content.toLowerCase().startsWith(prefix_file.prefix + "clear") && on_off_file.clear == "on") {
        if (message.content.toLowerCase() == prefix_file.prefix + "clear help") {
            return message.channel.send("**rb!clear help:*\* \n\n \`rb!clear NUMBER\` is simple enough to use, *NUMBER* is the amount of messages that you want to be deleted\. \n\n Example: \n\nUSER: rb!clear 10 \nRoast-Bot: Cleared 10 messages. <:roast_circle:474755210485563404> \n\n `rb!clear NUMBER` will still work if you add 2 or more spaces after `rb!clear`. \n\n Example: \n\nUSER: rb!clear      1 \n Roast-Bot: Cleared 1 message. <:roast_circle:474755210485563404> \n\n Another incorrect way is to send just `rb!clear` with no number. Roast-Bot will send a message back saying \"Incorrect usage of rb!clear, please provide how many messages you want to be deleted. The correct usage is rb!clear NUMBER. <:roast_circle:474755210485563404>\" \n\n If the bot or user doesn't have the correct permissions to use `rb!clear` it will return a warning message. For user not having the Manage Messages permission Roast-Bot will return \"Looks like you dont have the permissions to do that :( <:roast_circle:474755210485563404>\". For Roast-Bot not having the correct permissions to delete messages the message \"Roast-Bot needs to be given Manage Messages permissions to use this command :( <:roast_circle:474755210485563404>\" will be sent. \n\n Another error of `rb!clear NUMBER` is trying to delete too many messages.  Discord doesn't allow 100 or more messages to be deleted in one command. You can though send multiple `rb!clear` commands to delete more than 100 messages combined. If the user doesn't know about the message limit this error: The max number of messages you can delete is 100 :( <:roast_circle:474755210485563404> will be sent. \n\n\n If your still having trouble with `rb!clear NUMBER` please join the support server and ask in #roast-bot-help. \n\n\n\n Server Invite Link: \n https://discordapp.com/invite/9y8yV42")
        }
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("Roast-Bot needs to be given Manage Messages permissions to use this command :( <:roast_circle:474755210485563404>");
        } else if (int > 100) {
            return message.channel.send("The max number of messages you can delete is 100 :( <:roast_circle:474755210485563404>");
        } else if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("Looks like you dont have the permissions to do that :( <:roast_circle:474755210485563404>");
        } else if (int == "" || int == " ") {
            return message.channel.send("Incorrect usage of rb!clear, please provide how many messages you want to be deleted. The correct usage is rb!clear NUMBER. <:roast_circle:474755210485563404>");
        }
        message.channel.bulkDelete(int).then(() => {
            return message.channel.send(`Cleared ${int} messages. <:roast_circle:474755210485563404>`)
        });
    } else if(on_off_file.clear == "off") {
        return message.channel.send("This command has been turned off.");   
    }
}
