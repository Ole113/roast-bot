const mysql = require("mysql");

let connection = mysql.createConnection({
    host: "roast-bot.cnmnzfebwfwp.us-east-2.rds.amazonaws.com",
    user: "root",
    password: "aelb8362580",
    database: "roast_bot_unit_test",
    port: "3306",
});

connection.connect();

exports.run = async (message) => {

    //INSERT INTO `t_users` VALUES ('1', 'Bonjour', 'mondeEEEEE');

    let user = {
        username: message.author.username,
        userID: message.author.id,
        userXP: 0,
        userLevel: 0
    }
    connection.query(`SELECT * FROM roast_bot_xp WHERE userID = "${message.author.id}"`, function (err, result) {
        //the sql to be called depending if the user already is in db or xp++
        let updateXP;
        let updateLevel;

        if (!result.length) {
            //if there is no user with an id already assigned it makes a new row.
            updateXP = `INSERT INTO roast_bot_xp (username, userID, userXP, userLevel) VALUES ("${message.author.username}", "${message.author.id}", "${1}", "${1}")`;
        } else {
            let userXP = result[0].userXP;
            let userLevel = result[0].userLevel;

            if(message.content.toLowerCase().startsWith("rb!level")) {
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

                connection.query(`UPDATE roast_bot_xp set userLevel = userLevel + 1`, function(err, result) {
                    if(err) console.log(err);
                });

                switch(level) {
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

            updateXP = `UPDATE roast_bot_xp set userXP = userXP + 1`;

        }
        //console.log("LEVEL " + userLevel);
        
        connection.query(updateXP, function (err, result) {
            if (err) console.log(err);
        });
    });
}