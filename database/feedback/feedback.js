//add feedback help
const dbConfigFile = require("../../dbConfig.json")

const mysql = require("mysql");

let connection = mysql.createConnection({
	host: dbConfigFile.host,
	user: dbConfigFile.user,
	password: dbConfigFile.password,
	database: dbConfigFile.database,
	port: dbConfigFile.port
});

connection.connect();

exports.run = async (message) => {
    if (message.author.bot) { return; }
    connection.query(`SELECT * FROM roast_bot_custom_prefix WHERE guildID = "${message.guild.id}";`, function (err, result) {
        //makes a variable that will be rewritten every time the query is called, default is rb!.
        let prefix = "rb!";

        if (err) console.log(err);
        //checks if prefix has been set or not and sets prefix to it.
        if (result.length) prefix = result[0].prefix;
        const feedbackMessage = message.content.slice(prefixFile.prefix.length + 9, message.content.length);

        if (message.content.toLowerCase() == `${prefixFile.prefix}feedback`) {
            return message.channel.send("You need to specify what the feedback is with rb!feedback *feedback*.");
        }
        if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}feedback `)) {
            connection.query(`INSERT INTO roast_bot_feedback (username, userID, feedback) VALUES ("${message.author.username}", "${message.author.id}", "${feedbackMessage}")`, function (err, result) {
                if (err) console.log(err);
            });
            message.delete();
            return message.channel.send("Feedback has been sent!");
        }
    });
}