const connection = require("../../dbConnect.js");
const roastFile = require("../../commands/roast.js");
const prefixFile = require("../customPrefix/customPrefix.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }
    if (message.content.toLowerCase().startsWith(prefixFile.prefix || "rb!")) {

        connection.query(`SELECT * FROM roast_bot_on_off WHERE guildID = "${message.guild.id}";`, function (err, result) {

            let roastStatus = result[0].roast;
            if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}roast censor `) && !roastStatus) {
                return message.channel.send("You cannot turn on roast censoring because the Roast command has been turned off by an administrator.");
            } else {
                connection.query(`SELECT * FROM roast_bot_censor WHERE guildID = "${message.guild.id}";`, function (err, result) {
                    if (err) console.log(err);
                    if (!result.length) {
                        connection.query(`INSERT INTO roast_bot_censor (username, guildID, onOff) VALUES ("${message.author.username}", "${message.guild.id}", "${0}");`, function (err, result) {
                            if (err) console.log(err);
                        });
                    } else {
                        let censorStatus = result[0].onOff;
                        if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}roast censor on`)) {
                            if (result[0].onOff) {
                                return message.channel.send("Roast censoring is already on.");
                            } else {
                                connection.query(`UPDATE roast_bot_censor SET onOff = "${1}" WHERE guildID = "${message.guild.id}";`, function (err, result) {
                                    if (err) console.log(err);
                                });
                                return message.channel.send("Roast Censoring has been applied.")
                            }
                        } else if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}roast censor off`)) {
                            if (!result[0].onOff) {
                                return message.channel.send("Roast censoring is already off.");
                            } else {
                                connection.query(`UPDATE roast_bot_censor SET onOff = "${0}" WHERE guildID = "${message.guild.id}";`, function (err, result) {
                                    if (err) console.log(err);
                                });

                                return message.channel.send("Roast censoring has been removed.");
                            }
                        }
                        module.exports.censorStatus = censorStatus;
                    }
                });
            }
        });
    }
}