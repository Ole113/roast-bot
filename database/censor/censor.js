const dbConfigFile = require("../../dbConfig.json")
const roastFile = require("../../commands/roast.js");

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
            if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}roast censor `) && !roastStatus) {
                return message.channel.send("You cannot turn on roast censoring because the Roast command has been turned off by an administrator.");
            } else {
                connection.query(`SELECT * FROM roast_bot_censor WHERE guildID = "${message.guild.id}";`, function (err, result) {
                    if (err) console.log(err);

                    let query;
                    if (!result.length) {
                        query = `INSERT INTO roast_bot_censor (username, guildID, onOff) VALUES ("${message.author.username}", "${message.guild.id}", "0");`;
                    } else {
                        if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}roast censor on`)) {
                            query = `UPDATE roast_bot_censor SET onOff = "${1}" WHERE guildID = "${message.guild.id}";`;
                            if (result[0].onOff) {
                                return message.channel.send("Roast censoring is already on.");
                            } else {

                                roastFile[43].roast = "I failed a spelling test because they asked me how to spell 'b\*tch' and I wrote down your name.";
                                roastFile[92].roast = "You must\'ve been born at a pound because you're a son of a b\*tch.";
                                roastFile[92].roast = "What did you have for breakfast? B\*tch Flakes?";
                                roastFile[132].roast = "If I wanted a b\\*tch I'd have bought a dog.";
                                roastFile[40].roast = "Roses are red, sh\\*t is brown, shut the f\*\*k up, and sit the f\*\*k down.";
                                roastFile[44].roast = "Twinkle Twinkle little sl\\*t, name a guy you haven't f\*\*ked, was he skinny, was he tall, Nevermind you did them all.";
                                roastFile[47].roast = "I don't see any d\\*cks in the general vicinity... So I'm wondering why you keep opening your f\*\*king mouth.";
                                roastFile[72].roast = "Anyone willing to f\*\*k you is just too lazy to masturbate.";
                                roastFile[112].roast = "Good story, but in what chapter do you shut the f\*\*k up?";
                                roastFile[114].roast = "I\'d tell you to go f\*\*k yourself, but that would be cruel and unusual punishment.";
                                roastFile[57].roast = "Is your butt jealous of the amount of sh\*t that just came out of your mouth?";
                                roastFile[70].roast = "Your face could scare the sh\*t out of a toilet.";
                                roastFile[37].roast = "You should wear a condom on your head because if you're gonna act like a d\*ck you might as well dress like one!";
                                roastFile[43].roast = "I guess those penis enlargement pills are working - you're twice the d\*ck you were yesterday!";
                                roastFile[49].roast = "Twinkle twinkle little slut, You like d\*ck inside your butt.";
                                roastFile[64].roast = "You have more d\*ck in your personality than you do in your pants.";
                                roastFile[70].roast = "Being a d\*ck to everyone won\'t make yours any bigger.";
                                roastFile[88].roast = "The only reason your partner likes your d\*ck is because they were taught to enjoy the little things in life.";

                                return message.channel.send("Roast censoring has been applied.");
                            }
                        } else if (message.content.toLowerCase().startsWith(`${prefixFile.prefix}roast censor off`)) {
                            query = `UPDATE roast_bot_censor SET onOff = "${0}" WHERE guildID = "${message.guild.id}";`;
                            if (!result[0].onOff) {
                                return message.channel.send("Roast censoring is already off.");
                            } else {

                                roastFile[43].roast = "I failed a spelling test because they asked me how to spell 'bitch' and I wrote down your name.";
                                roastFile[92].roast = "You must\'ve been born at a pound because you're a son of a bitch.";
                                roastFile[92].roast = "What did you have for breakfast? Bitch Flakes?";
                                roastFile[132].roast = "If I wanted a bitch I'd have bought a dog.";
                                roastFile[40].roast = "Roses are red, shit is brown, shut the fuck up, and sit the fuck down.";
                                roastFile[44].roast = "Twinkle Twinkle little slut, name a guy you haven't fucked, was he skinny, was he tall, Nevermind you did them all.";
                                roastFile[47].roast = "I don't see any dicks in the general vicinity... So I'm wondering why you keep opening your fucking mouth.";
                                roastFile[72].roast = "Anyone willing to fuck you is just too lazy to masturbate.";
                                roastFile[112].roast = "Good story, but in what chapter do you shut the fuck up?";
                                roastFile[114].roast = "I\'d tell you to go fuck yourself, but that would be cruel and unusual punishment.";
                                roastFile[57].roast = "Is your butt jealous of the amount of shit that just came out of your mouth?";
                                roastFile[70].roast = "Your face could scare the shit out of a toilet.";
                                roastFile[37].roast = "You should wear a condom on your head because if you're gonna act like a dick you might as well dress like one!";
                                roastFile[43].roast = "I guess those penis enlargement pills are working - you're twice the dick you were yesterday!";
                                roastFile[49].roast = "Twinkle twinkle little slut, You like dick inside your butt.";
                                roastFile[64].roast = "You have more dick in your personality than you do in your pants.";
                                roastFile[70].roast = "Being a dick to everyone won\'t make yours any bigger.";
                                roastFile[88].roast = "The only reason your partner likes your dick is because they were taught to enjoy the little things in life.";

                                return message.channel.send("Roast censoring has been removed.");
                            }
                        }
                    }
                    connection.query(query, function (err, result) {
                        if (err) console.log(err);
                    });
                });

            }
        });
    });
}