
const mysql = require("mysql");

exports.run = async () => {

try{
var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "admin",
    password: "Vector$bestGGun1158",
    database: "roast-bot-db"
});
connection.connect();
}
catch(error){
    console.log(error);
}
}