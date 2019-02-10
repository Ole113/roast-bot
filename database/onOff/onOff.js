const connection = require("../../dbConnect.js");
const prefixFile = require("../customPrefix/customPrefix.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }
    if (message.content.toLowerCase().startsWith(prefixFile.prefix || "r!")) {

        connection.query(`SELECT * FROM roast_bot_on_off WHERE guildID = "${message.guild.id}";`, function (err, result) {
            if (err) console.log(err);

            //sets the default of everything to ON.
            if (!result.length) {
                connection.query(`INSERT INTO roast_bot_on_off (guildID, username, _clear, bot, meme, roast, say, _server, urban, user, vid) VALUES ("${message.guild.id}", "${message.author.username}", "${1}", "${1}", "${1}", "${1}", "${1}", "${1}", "${1}", "${1}", "${1}");`, function (err, result) {
                    if (err) console.log(err);
                });
            }
        });
    }
}