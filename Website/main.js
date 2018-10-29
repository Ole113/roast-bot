var express = require("express");
var app = express();
var path = require("path");

app.set('port', (process.env.PORT || 80))
app.use(express.static("./website"))

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "./website/index.html"));
});

app.listen(app.get("port"), function() {
  console.log("Node app is running at localhost:" + app.get("port"))
});