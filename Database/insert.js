
const mysql = require("mysql");

exports.run = async () => {

try{
var connection = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "Vector$bestGGun1158",
    database: "roast-bot-db"
})
connection.connect();
}
catch(error){
    console.log(error);
}
}