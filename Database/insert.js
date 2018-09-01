
const mysql = require("mysql");

exports.run = async () => {
var connection = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "Vector$bestGGun1158",
    database: "roast-bot-db"
})
connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
  
  connection.end();
  
}