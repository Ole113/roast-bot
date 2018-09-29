const fs = require("fs");
var content = fs.readFileSync("./Database/prefix.json");
var jsonContent = JSON.parse(content);

exports.run = async (message) => {
    console.log("Prefix:", jsonContent.prefix);
    if(message.content.toLowerCase == jsonContent.prefix + "test") {
        return message.channel.send("Worked");
    }
}