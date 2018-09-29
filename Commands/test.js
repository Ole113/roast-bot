const prefix_file = require("../Database/prefix.json");

exports.run = async (message) => {
    if(message.content.toLowerCase == prefix_file.prefix + "test") {
        return message.channel.send("Worked");
        console.log("worked");
    }
}