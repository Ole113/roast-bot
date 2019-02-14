//add feedback help
const connection = require("../../dbConnect.js");
const prefixFile = require("../customPrefix/customPrefix.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }

    if (message.content.toLowerCase() == `${prefixFile.prefix}feedback`) {
        return message.channel.send("You need to specify what the feedback is with rb!feedback *feedback*.");
    }
    if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}feedback `)) {
        const feedbackMessage = message.content.slice(prefixFile.prefix.length + 9, message.content.length);
        connection.query(`INSERT INTO roast_bot_feedback (username, userID, feedback) VALUES ("${message.author.username}", "${message.author.id}", "${feedbackMessage}")`, function (err, result) {
            if (err) console.log(err);
        });
        message.delete();
        return message.channel.send("Feedback has been sent!");
    }
}