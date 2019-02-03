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
        connection.query(`SELECT * FROM roast_bot_on_off WHERE guildID = "${message.guild.id}";`, function (err, result) {
            let roastStatus = result[0].roast;
            if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}roast custom `) && !roastStatus) {
                return message.channel.send("You cannot search roasts because the Roast command has been turned off by an administrator.");
            } else {
                connection.query(`SELECT roasts FROM roast_bot_custom_roast WHERE userID = "${message.author.id}";`, function (err, result) {
                    if (err) console.log(err);
                    let resultt;
                    if (!result.length) {
                        connection.query(`INSERT INTO roast_bot_custom_roast (username, userID, roastNumber, roasts) VALUES ("${message.author.username}", "${message.author.id}", "${0}", "${""}");`, function (err, result) {
                            if (err) console.log(err);
                            resultt = false;
                        });
                    } else {
                        resultt = true;
                        let roastString = "";
                        var roastsLength = (result[0].roasts.match(/<!>\^\?\^<!>/g) || []).length;
                        if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}roast custom `)) {
                            if (!resultt) {
                                return message.channel.send(`You haven't set any custom roasts yet, use *${prefixFile.prefix}roast custom add *roast* to set one.`)
                            } else if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}croast all`)) {
                                return message.channel.send("FF");
                                //return all custom roasts.
                            } else if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}croast #`)) {
                                let number = message.content.slice(prefixFile.prefix.length + 8, message.content.length);
                                //return custom roast[number].
                            } else if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}croast remove #`)) {
                                let number = message.content.slice(prefixFile.prefix.length + 15, message.content.length);
                                //remove custom roast[number].
                            } else if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}croast add `)) {
                                let roast = message.content.slice(prefixFile.prefix.length + 11, message.content.length);
                                roastString += roast + "<!>^?^<!>";
                                connection.query(`UPDATE roast_bot_custom_roast SET roasts = "${roastString}" WHERE userID = "${message.author.id}"`, function (err, result) {
                                    if (err) console.log(err);
                                    return message.channel.send(`Your roast has successfully been added as custom roast #${roastsLength}, use r!croast #${roastsLength} to view it.`);
                                });
                            }
                        }
                    }
                });
            }
        });
    });
}