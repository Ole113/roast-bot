/*
*
*   Things to add to r!clear:
* ----------------------------
*  NEED TO TEST: Make it so it deletes the exact number of messages.
*  Make it so if someone passes "r!clear abc" it will give an error AND UPDATE R!CLEAR HELP DOCS
*/

const Discord = require("discord.js");

exports.run = async (message) => {
    const word = message.content;
    const number = word.slice(7, word.length);
    const int = Number(number);
    if (message.content.startsWith("r!clear")) {

        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("Roast-Bot needs to be given Manage Messages permissions to use this command :( <:roast_circle:474755210485563404>");
        } else if (int >= 100) {
            return message.channel.send("The max number of messages you can delete is 100 :( <:roast_circle:474755210485563404>");
        } else if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("Looks like you dont have the permissions to do that :( <:roast_circle:474755210485563404>");
        } else if (int == "" || int == " ") {
            return message.channel.send("Incorrect usage of r!clear, please provide how many messages you want to be deleted. The correct usage is r!clear NUMBER. <:roast_circle:474755210485563404>");
        }
        message.channel.bulkDelete(int).then(() => {
            return message.channel.send(`Cleared ${int} messages. <:roast_circle:474755210485563404>`)
        });
    }
    if (message.content == "r!clear help") {
        return message.channel.send("**r!clear help:*\* \n\n \`r!clear NUMBER\` is simple enough to use, *NUMBER* is the amount of messages that you want to be deleted\. \n\n Example: \nUSER: r!clear 10 \nRoast-Bot: Cleared 10 messages. <:roast_circle:474755210485563404> \n\n `r!clear NUMBER` will still work if you add 2 or more spaces after `r!clear`. \n\n Example: \n\nUSER: r!clear      1 \n Roast-Bot: Cleared 1 message. <:roast_circle:474755210485563404> \n\n Another incorrect way is to send just `r!clear` with no number. Roast-Bot will send a message back saying \"Incorrect usage of r!clear, please provide how many messages you want to be deleted. The correct usage is r!clear NUMBER. <:roast_circle:474755210485563404>\" \n\n If the bot or user doesn't have the correct permissions to use `r!clear` it will return a warning message. For user not having the Manage Messages permission Roast-Bot will return \"Looks like you dont have the permissions to do that :( <:roast_circle:474755210485563404>\". For Roast-Bot not having the correct permissions to delete messages the message \"Roast-Bot needs to be given Manage Messages permissions to use this command :( <:roast_circle:474755210485563404>\" will be sent. \n\n Another error of `r!clear NUMBER` is trying to delete too many messages.  Discord doesn't allow more than 100 messages to be deleted in one command. You can though send multiple `r!clear` commands to delete more than 100 messages combined. If the user doesn't know about the message limit this error: The max number of messages you can delete is 100 :( <:roast_circle:474755210485563404> will be sent. \n\n\n\n If your still having trouble with `r!clear NUMBER` please join the support server and ask in #roast-bot-help. \n\n Server Invite Link: \n https://discordapp.com/invite/9y8yV42")
    }
}