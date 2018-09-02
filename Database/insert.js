var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "jade");

app.listen(3000, function() {
    console.log("Listening on port 3000.")
})