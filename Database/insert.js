
const mysql = require("mysql");

exports.run = async () => {

try{
var connection = mysql.createConnection({
    host: "ElbelHP",
    port: "3306",
    socket: "MySQL",
    user: "root",
    password: "Bestadminevr113",
    database: "roast-bot-db"
});
connection.connect();
}
catch(error){
    console.log(error);
}
}