const dbConfigFile = require("../../dbConfig.json");

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
    if (message.author.bot) return;
    connection.query(`SELECT * FROM roast_bot_custom_prefix WHERE guildID = "${message.guild.id}";`, function (err, result) {
        //makes a variable that will be rewritten every time the query is called, default is rb!.
        let prefix = "rb!";

        if (err) console.log(err);
        //checks if prefix has been set or not and sets prefix to it.
        if (result.length) prefix = result[0].prefix;
        if (message.content.toLowerCase().startsWith(prefix || "rb!")) {
            connection.query(`SELECT * FROM roast_bot_xp WHERE userID = "${message.author.id}"`, function (err, result) {
                //the sql to be called depending if the user already is in db or xp++
                let updateXP;

                if (!result.length) {
                    //if there is no user with an id already assigned it makes a new row.
                    updateXP = `INSERT INTO roast_bot_xp (username, userID, guildID, userXP, userLevel) VALUES ("${message.author.username}", "${message.author.id}", "${message.guild.id}", "${1}", "${1}")`;
                } else {
                    let userXP = result[0].userXP;
                    let userLevel = result[0].userLevel;
                    if (message.content.toLowerCase().startsWith(`${prefix}level `)) {
                        connection.query(`SELECT * FROM roast_bot_xp WHERE userID = "${message.mentions.users.first().id}";`, function (err, result) {
                            if (err) console.log(err);
                            return message.channel.send(`The current XP of ${message.mentions.users.first().username} is ${result[0].userXP}, and their level is ${result[0].userLevel}! <:roast_circle:474755210485563404>`);
                        });
                    } else if (message.content.toLowerCase() == `${prefix}level`) {
                        return message.reply(`You currently have ${userXP} XP, and are level ${userLevel}! <:roast_circle:474755210485563404>`);
                    }

                    //for some reason it has to be -1 then the actual number
                    if (Number(userXP) == 4) {
                        returnLevelUp(2);
                    } else if (Number(userXP) == 14) {
                        returnLevelUp(3);
                    } else if (Number(userXP) == 24) {
                        returnLevelUp(4);
                    } else if (Number(userXP) == 49) {
                        returnLevelUp(5);
                    } else if (Number(userXP) == 99) {
                        returnLevelUp(6);
                    } else if (Number(userXP) == 199) {
                        returnLevelUp(7);
                    } else if (Number(userXP) == 499) {
                        returnLevelUp(8);
                    } else if (Number(userXP) == 999) {
                        returnLevelUp(9);
                    } else if (Number(userXP) == 4999) {
                        returnLevelUp(10);
                    }

                    function returnLevelUp(level) {

                        connection.query(`UPDATE roast_bot_xp SET userLevel = userLevel + 1 WHERE userID = "${message.author.id}"`, function (err, result) {
                            if (err) console.log(err);
                        });

                        switch (level) {
                            case 2:
                                return message.reply("Level up, your're now level 2: Roast-Noob! <:roast_circle:474755210485563404>.\n\n5/15 XP for level 3.");
                            case 3:
                                return message.reply("Level up, your're now level 3: Roast-Learner! <:roast_circle:474755210485563404>.\n\n15/25 XP for level 4.");
                            case 4:
                                return message.reply("Level up, your're now level 4: Mediocre Roaster! <:roast_circle:474755210485563404>\n\n25/50 XP for level 5.");
                            case 5:
                                return message.reply("Level up, your're now level 5: Advanced Roaster! <:roast_circle:474755210485563404>\n\n50/100 XP for level 6.");
                            case 6:
                                return message.reply("Level up, your're now level 6: Roast-Master! <:roast_circle:474755210485563404>\n\n100/200 XP for level 7.");
                            case 7:
                                return message.reply("Level up, your're now level 7: Roast-Jesus! <:roast_circle:474755210485563404>\n\n200/500 XP for level 8.");
                            case 8:
                                return message.reply("Level up, your're now level 8: Roast-God! <:roast_circle:474755210485563404>\n\n500/1000 XP for level 9.");
                            case 9:
                                return message.reply("Level up, your're now level 9: Roast-Champion! <:roast_circle:474755210485563404>\n\n1000/5000 XP for level 10.");
                            case 10:
                                return message.reply("Level up, your're now max level, level 10. Congrats!");
                        }
                    }

                    updateXP = `UPDATE roast_bot_xp SET userXP = userXP + 1 WHERE userID = "${message.author.id}"`;
                }

                connection.query(updateXP, function (err, result) {
                    if (err) console.log(err);
                });
            });
        } else if (message.content.toLowerCase().startsWith(prefix + "level help")) {
            return message.channel.send("**rb!level help**\n\n`rb!level` is how you check what your current level/XP is. XP is gained by using a `rb!` command.  Levels are gained by gaining enough XP. For information on XP needed to level up look at the XP-System to part of `rb!help`.\n\nExample:\nUSER: rb!level\nRoast-Bot: @USER, You currently have 5 XP, and are level 1! <:roast_circle:474755210485563404>\n\nStill having trouble with `rb!level` or have a suggestion? Join the support server: https://discordapp.com/invite/9y8yV42");
        }
    });
}