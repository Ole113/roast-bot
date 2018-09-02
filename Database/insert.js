
const mysql = require("mysql");

exports.run = async () => {

try{
var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
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