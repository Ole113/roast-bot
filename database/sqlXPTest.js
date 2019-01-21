const mysql = require("mysql");
const dbConfigFile = require("../dbConfig.json");

let connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
});

connection.connect();

exports.run = async (message) => {

    let user = {
        username: message.author.username,
        userID: message.author.id,
        userXP: 0,
        userLevel: 0
    }
    
    let query = connection.query("insert into roast_bot_xp set ?", user, function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        user.userID++;
        console.log(user.userXP);
        //console.error(result);
    });

    if(user.userXP >= 10) {
        user.userLevel = 1;
        console.log("LEVEL 1");
    } else {
        console.log(`LEVEL: ${user.userLevel}, XP: ${user.userXP}`);
    }
}