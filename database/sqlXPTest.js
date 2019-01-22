const mysql = require("mysql");

let connection = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: "",
    port: "",
});

connection.connect();

exports.run = async (message) => {

    //INSERT INTO `t_users` VALUES ('1', 'Bonjour', 'mondeEEEEE');

    let user = {
        username: message.member.user.tag,
        userID: message.member.id,
        userXP: 0,
        userLevel: 0
    }

    //SELECT * FROM roast_bot_xp WHERE userID = "390315922369282049";
    let testQuery = connection.query(`SELECT * FROM roast_bot_xp WHERE userID = "${message.memeber.id}"`, function (err, result) {
        if (result) {
            let XP_Update_Query = connection.query(`UPDATE roast_bot_xp SET userXP = userXP + 1 WHERE userID = "${message.member.id}"`, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(result);
            })
        } else if (!result.length) {
            let query = connection.query("INSERT INTO roast_bot_xp SET ?", user, function (err, result) {
                if (err) {
                    console.error(err);
                    return;
                }
                console.error(result);
            });
        }
    });
}